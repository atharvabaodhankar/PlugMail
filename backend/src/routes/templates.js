const express = require('express');
const { db } = require('../firebase');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/templates
 */
router.get('/', requireAuth, async (req, res) => {
  try {
    const snapshot = await db.collection('templates')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const templates = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

/**
 * POST /api/templates
 */
router.post('/', requireAuth, async (req, res) => {
  try {
    const { name, category, subject, html } = req.body;
    if (!name) return res.status(400).json({ error: 'Template name is required' });

    // Extract variables using regex (e.g. {{name}})
    const varRegex = /\{\{([^}]+)\}\}/g;
    const matches = [...(html || '').matchAll(varRegex), ...(subject || '').matchAll(varRegex)];
    const vars = [...new Set(matches.map(m => m[1].trim()))];

    const newTemplate = {
      userId: req.user.uid,
      name,
      category: category || 'General',
      subject: subject || '',
      html: html || '',
      vars,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('templates').add(newTemplate);

    res.json({
      id: docRef.id,
      ...newTemplate
    });
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
});

/**
 * DELETE /api/templates/:id
 */
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const templateRef = db.collection('templates').doc(id);
    const doc = await templateRef.get();

    if (!doc.exists || doc.data().userId !== req.user.uid) {
      return res.status(404).json({ error: 'Template not found' });
    }

    await templateRef.delete();
    res.json({ success: true, message: 'Template deleted' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

module.exports = router;
