import Blog from '../models/Blog.js';
import User from '../models/User.js';

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags, imageUrl } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const blog = new Blog({
      title,
      content,
      author: req.user.userId,
      authorName: user.name,
      authorProfilePic: user.profilePic,
      category,
      tags: tags || [],
      imageUrl
    });
    
    await blog.save();
    
    // Populate author details
    await blog.populate('author', 'name email profilePic');
    
    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};

// @desc    Get all blogs (for all users to see)
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { authorName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('author', 'name email profilePic');
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      blogs,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalBlogs: total
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email profilePic')
      .populate('comments.user', 'name profilePic');
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private
export const updateBlog = async (req, res) => {
  try {
    const { title, content, category, tags, imageUrl } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Check if user is the author
    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'You can only edit your own blogs' });
    }
    
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.imageUrl = imageUrl || blog.imageUrl;
    blog.updatedAt = Date.now();
    
    await blog.save();
    
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    // Check if user is the author
    if (blog.author.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'You can only delete your own blogs' });
    }
    
    await blog.deleteOne();
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

// @desc    Like/Unlike a blog
// @route   POST /api/blogs/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    const likeIndex = blog.likes.indexOf(req.user.userId);
    
    if (likeIndex === -1) {
      // Like the blog
      blog.likes.push(req.user.userId);
      await blog.save();
      res.json({ message: 'Blog liked', liked: true, likesCount: blog.likes.length });
    } else {
      // Unlike the blog
      blog.likes.splice(likeIndex, 1);
      await blog.save();
      res.json({ message: 'Blog unliked', liked: false, likesCount: blog.likes.length });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};

// @desc    Add comment to blog
// @route   POST /api/blogs/:id/comments
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;
    
    if (!comment) {
      return res.status(400).json({ error: 'Comment is required' });
    }
    
    const user = await User.findById(req.user.userId);
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    blog.comments.push({
      user: req.user.userId,
      userName: user.name,
      comment,
      createdAt: new Date()
    });
    
    await blog.save();
    
    res.status(201).json({ 
      message: 'Comment added successfully',
      comment: blog.comments[blog.comments.length - 1]
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// @desc    Get user's own blogs
// @route   GET /api/my-blogs
// @access  Private
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ error: 'Failed to fetch your blogs' });
  }
};