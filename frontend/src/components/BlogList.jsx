// components/BlogList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
//import LoadingSpinner from './LoadingSpinner';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Technology', 'Lifestyle', 'Food', 'Travel', 'Health', 'Business'];

  useEffect(() => {
    fetchBlogs();
  }, [page, category, searchTerm]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/blogs', {
        params: { page, limit: 10, category, search: searchTerm }
      });
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to load blogs. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBlogs();
  };

  if (loading){
    const a= `<span>Loading</span>`
    return a;
  } 

  return (
    <div className="blog-list-container">
      <div className="blog-header">
        <h1>Community Blogs</h1>
        <p>Discover amazing content from our community</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="filters-section">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍 Search</button>
        </form>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? 'active' : ''}`}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blogs found. Be the first to create one!</p>
        </div>
      ) : (
        <>
          <div className="blogs-grid">
            {blogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogList;