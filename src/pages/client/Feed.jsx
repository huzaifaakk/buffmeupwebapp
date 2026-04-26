import React, { useState } from 'react';
import { useSocial } from '../../hooks/useSocial';
import { useAuth } from '../../context/AuthContext';
import { PostCard } from '../../components/Feed/PostCard';
import { Button } from '../../components/ui/Button';
import { ClientLayout } from './Sessions';
import { Image as ImageIcon, X } from 'lucide-react';

export const ClientFeed = () => {
  const { posts, loading, createPost, toggleLike, addComment } = useSocial();
  const { user, profile } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim() && !selectedImage) return;

    setIsPosting(true);
    await createPost(user.id, newPostContent, selectedImage, profile);
    setNewPostContent('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsPosting(false);
  };

  return (
    <ClientLayout activePath="/client/feed">
      <div className="feed-layout">
      <div className="feed-main">
        <div className="create-post-card fade-in">
          <form onSubmit={handlePostSubmit}>
            <textarea 
              placeholder="What's on your mind? Share your workout..." 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="post-textarea"
              rows={3}
            />
            
            {imagePreview && (
              <div className="image-preview-container">
                <img src={imagePreview} alt="preview" className="post-preview-img" />
                <button type="button" className="remove-image-btn" onClick={() => { setSelectedImage(null); setImagePreview(null); }}>
                  <X size={16} />
                </button>
              </div>
            )}

            <div className="post-actions-row">
              <label className="image-upload-label">
                <ImageIcon size={20} />
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </label>
              <Button type="submit" disabled={isPosting || (!newPostContent.trim() && !selectedImage)}>
                {isPosting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </form>
        </div>

        <div className="posts-container">
          {loading ? (
            <div className="p-4 text-center">Loading feed...</div>
          ) : posts.length > 0 ? (
            posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLike={(postId) => toggleLike(postId, user.id)}
                onComment={(postId, content) => addComment(postId, user.id, content, profile)}
              />
            ))
          ) : (
            <div className="p-4 text-center">No posts yet. Be the first to post!</div>
          )}
        </div>
      </div>

      <div className="feed-sidebar fade-in">
        <div className="sidebar-widget">
          <h3>Active This Week</h3>
          <p className="text-secondary" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Coming soon: Top users list
          </p>
        </div>
      </div>

      <style>{`
        .feed-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .create-post-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-sm);
        }
        .post-textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          font-size: 1rem;
          color: var(--text-primary);
          font-family: var(--font-body);
        }
        .post-actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          margin-top: 0.5rem;
        }
        .image-upload-label {
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .image-upload-label:hover {
          color: var(--accent-primary);
        }
        .image-preview-container {
          position: relative;
          margin: 1rem 0;
          border-radius: var(--radius-btn);
          overflow: hidden;
          max-height: 300px;
        }
        .post-preview-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }
        .remove-image-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          padding: 0.25rem;
          display: flex;
          cursor: pointer;
        }
        .feed-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .sidebar-widget {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        .sidebar-widget h3 {
          font-size: 1.125rem;
        }
        @media (max-width: 768px) {
          .feed-layout {
            grid-template-columns: 1fr;
          }
          .feed-sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
    </ClientLayout>
  );
};
