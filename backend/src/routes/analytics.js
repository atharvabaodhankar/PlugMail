const express = require('express');
const { db } = require('../firebase');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/analytics
 * Aggregate email logs for dashboard charts and metrics
 */
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.uid;

    // 1. Fetch all logs for aggregation
    const snapshot = await db.collection('emailLogs')
      .where('userId', '==', userId)
      .get();

    // 2. Fetch templates for count and name mapping
    const templatesSnapshot = await db.collection('templates')
      .where('userId', '==', userId)
      .get();
    
    const templateCount = templatesSnapshot.size;
    const templateMap = {};
    templatesSnapshot.docs.forEach(doc => {
      templateMap[doc.id] = doc.data().name;
    });

    // 3. Aggregate statistics
    let totalSent = 0;
    let totalFailed = 0;
    let providerStats = { gmail: 0 };
    const dailyData = {};

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const date = data.timestamp ? data.timestamp.split('T')[0] : 'Unknown';
      
      if (!dailyData[date]) {
        dailyData[date] = { date, sent: 0, failed: 0 };
      }

      if (data.status === 'sent') {
        totalSent++;
        dailyData[date].sent++;
        providerStats[data.provider || 'gmail']++;
      } else {
        totalFailed++;
        dailyData[date].failed++;
      }
    });

    const total = totalSent + totalFailed;
    const successRate = total > 0 ? ((totalSent / total) * 100).toFixed(1) : "0.0";

    // 4. Fetch 5 most recent logs
    const recentSnapshot = await db.collection('emailLogs')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(5)
      .get();

    const recentLogs = recentSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        template: templateMap[data.templateId] || 'unknown',
        time: data.timestamp ? new Date(data.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', ' ·') : 'Unknown'
      };
    });

    const chartData = Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));

    res.json({
      totalSent,
      totalFailed,
      successRate,
      templateCount,
      providerStats,
      chartData,
      recentLogs
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
