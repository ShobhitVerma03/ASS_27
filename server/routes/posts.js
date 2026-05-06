const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Author = require('../models/Author');
const Tag = require('../models/Tag');

// POST /posts → create post and link author + tags
router.post('/', async (req, res) => {
  try {
    const { title, content, authorId, tagIds } = req.body;

    // 1. Create the post
    const post = new Post({
      title,
      content,
      author: authorId,
      tags: tagIds
    });
    await post.save();

    // 2. Update Author's posts array (One-to-Many)
    await Author.findByIdAndUpdate(authorId, {
      $push: { posts: post._id }
    });

    // 3. Update each Tag's posts array (Many-to-Many)
    if (tagIds && tagIds.length > 0) {
      await Tag.updateMany(
        { _id: { $in: tagIds } },
        { $push: { posts: post._id } }
      );
    }

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /posts → list posts with author + tags populated
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author')
      .populate('tags');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
