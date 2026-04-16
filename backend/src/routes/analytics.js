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
    const snapshot = await db.collection('emailLogs')
      .where('userId', '==', req.user.uid)
      .get();

    let totalSent = 0;
    let totalFailed = 0;
    let providerStats = { gmail: 0 };
    
    // For a simple daily chart (last 7 days logic would go here)
    // We'll aggregate by YYYY-MM-DD
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
    const successRate = total > 0 ? Math.round((totalSent / total) * 100) : 0;

    // Convert dailyData object to sorted array
    const chartData = Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));

    res.json({
      totalSent,
      totalFailed,
      successRate,
      providerStats,
      chartData
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
