const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

// POST /tags → create tag
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /tags → list tags with posts populated
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find().populate('posts');
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
