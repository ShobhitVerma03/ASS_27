const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authorRoutes = require('./routes/authors');
const postRoutes = require('./routes/posts');
const tagRoutes = require('./routes/tags');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blog_relation_demo';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);
app.use('/tags', tagRoutes);

app.get('/', (req, res) => {
  res.send('Blog Relationship Demo API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
