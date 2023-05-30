const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = 7070;


app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://amagbaugochukwu:VkcKXkXBnLgMiPFZ@cluster0.y5oi9di.mongodb.net/")
.then( () =>{
    console.log("connection to the database is successful");
})
.catch((err) => {
    console.error('Failed to connect to the database', err);
  });

  const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model('Blog', blogSchema);
// const Blog = require('./blog');

// Create a new blog post
app.post('/blogs', (req, res) => {
  const { title, content } = req.body;

  const newBlog = new Blog({ title, content });

  newBlog.save()
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create blog post' });
    });
});

// Update an existing blog post
app.put('/blogs/:id', (req, res) => {
  const { title, content } = req.body;
  const blogId = req.params.id;
Blog.findByIdAndUpdate(blogId, { title, content }, { new: true })
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json(blog);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update blog post' });
    });
});

// Delete a blog post
app.delete('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
Blog.findByIdAndRemove(blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      res.json({ message: 'Blog post deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to delete blog post' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
