// components/BlogCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
//import { formatDistanceToNow } from 'date-fns';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="blog-card" onClick={() => navigate(`/blog/${blog._id}`)}>
      {blog.imageUrl && (
        <div className="blog-card-image">
          <img src={blog.imageUrl} alt={blog.title} />
        </div>
      )}
      
      <div className="blog-card-content">
        <div className="blog-category">{blog.category}</div>
        <h3>{blog.title}</h3>
        <p>{truncateText(blog.content)}</p>
        
        <div className="blog-meta">
          <div className="author-info">
            {blog.authorProfilePic ? (
              <img src={blog.authorProfilePic} alt={blog.authorName} className="author-avatar" />
            ) : (
              <div className="author-avatar-placeholder">
                {blog.authorName?.charAt(0).toUpperCase()}
              </div>
            )}
            <span>{blog.authorName}</span>
          </div>
          
          <div className="blog-stats">
            <span>❤️ {blog.likes?.length || 0}</span>
            <span>💬 {blog.comments?.length || 0}</span>
            {/* <span>📅 {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;