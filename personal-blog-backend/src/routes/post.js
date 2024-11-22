const express = require('express');
const Post = require('../models/post.mongo');
const authMiddleware = require('../utils/authMiddleware');

const blogPostRouter = express.Router();

blogPostRouter.post('/post', authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required.' });
        }

        const newPost = new Post({ title, content, authorId: req.userId });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully.', post: newPost });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the post.' });
    }
});

  
blogPostRouter.get('/posts',authMiddleware, async (req, res) => {
    try {
      const { page = 1, limit = 10, self = false } = req.query;
  
      const filter = self === 'true' ? { authorId: req.userId } : {};
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      const userPosts = await Post.find(filter)
        .sort({ createdAt: -1 }) // Sort by most recent
        .skip(skip)
        .limit(parseInt(limit));
  
      const totalPosts = await Post.countDocuments(filter);
  
      res.status(200).json({
        posts : userPosts,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalPosts / parseInt(limit)),
        totalPosts,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve posts.', details: error.message });
    }
  });
  
  
  

module.exports = blogPostRouter;