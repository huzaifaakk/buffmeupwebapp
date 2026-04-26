import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PostCard = ({ post, onLike, onComment }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const isLiked = post.likes?.some(like => like.user_id === user?.id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const displayName = post.profiles?.name || post.profiles?.username || post.username || 'Athlete';

  return (
    <div className="post-card fade-in">
      <div className="post-header">
        <div className="post-avatar">
          {post.profiles?.avatar_url ? (
            <img src={post.profiles.avatar_url} alt="avatar" />
          ) : (
            <div className="avatar-placeholder">{displayName.charAt(0).toUpperCase()}</div>
          )}
        </div>
        <div className="post-meta">
          <span className="post-username">{displayName}</span>
          <span className="post-time">{new Date(post.created_at).toLocaleString()}</span>
        </div>
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
        {post.image_url && <img src={post.image_url} alt="post" className="post-image" />}
      </div>

      <div className="post-actions">
        <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={() => onLike(post.id)}>
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          <span>{post.likes?.length || 0}</span>
        </button>
        <button className={`action-btn ${showComments ? 'active' : ''}`} onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={20} />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section fade-in">
          <div className="comments-list">
            {post.comments?.map(comment => (
              <div key={comment.id} className="comment-item">
                <span className="comment-user">{comment.profiles?.username || comment.username || 'User'}</span>
                <span className="comment-text">{comment.content}</span>
              </div>
            ))}
          </div>
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input 
              type="text" 
              placeholder="Write a comment..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit" disabled={!commentText.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        .post-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        .post-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .post-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        .post-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background-color: var(--accent-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .post-meta {
          display: flex;
          flex-direction: column;
        }
        .post-username {
          font-weight: 600;
        }
        .post-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .post-content {
          margin-bottom: 1rem;
        }
        .post-content p {
          margin-bottom: 0.5rem;
        }
        .post-image {
          width: 100%;
          border-radius: var(--radius-btn);
          margin-top: 0.5rem;
        }
        .post-actions {
          display: flex;
          gap: 1rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .action-btn:hover, .action-btn.active {
          color: var(--accent-primary);
        }
        .action-btn.liked {
          color: var(--status-danger);
        }
        .comments-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .comment-item {
          font-size: 0.875rem;
        }
        .comment-user {
          font-weight: 600;
          margin-right: 0.5rem;
        }
        .comment-form {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .comment-input {
          flex: 1;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-badge);
          background: transparent;
          color: var(--text-primary);
          outline: none;
        }
        .comment-input:focus {
          border-color: var(--accent-primary);
        }
        .comment-submit {
          color: var(--accent-primary);
          padding: 0.5rem;
          display: flex;
        }
        .comment-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};
