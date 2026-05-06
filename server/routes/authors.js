const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// POST /authors → create author
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const author = new Author({ name, email });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /authors → list authors with posts populated
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find().populate('posts');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
