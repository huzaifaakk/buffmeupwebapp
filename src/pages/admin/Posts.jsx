import React from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { adminLinks } from './Dashboard';
import { useSocial } from '../../hooks/useSocial';
import { Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const AdminPosts = () => {
  const { posts, loading, refetch } = useSocial();

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) alert('Error deleting post: ' + error.message);
      else {
        alert('Post deleted successfully');
        refetch();
      }
    }
  };

  return (
    <div>
      <SidebarLayout title="Content Moderation" links={adminLinks}>
        <div className="moderation-container fade-in">
          <div className="table-container">
            {loading ? (
              <div className="p-4">Loading content...</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Content Snippet</th>
                    <th>Posted At</th>
                    <th>Likes</th>
                    <th>Comments</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>{post.profiles?.name || post.profiles?.username || post.username}</td>
                      <td>{post.content.length > 50 ? post.content.substring(0, 50) + '...' : post.content}</td>
                      <td>{new Date(post.created_at).toLocaleString()}</td>
                      <td>{post.likes?.length || 0}</td>
                      <td>{post.comments?.length || 0}</td>
                      <td>
                        <button 
                          className="btn-icon text-danger" 
                          onClick={() => handleDelete(post.id)}
                          title="Delete Post"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center p-4">No content found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </SidebarLayout>
      <style>{`
        .moderation-container {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-card);
          overflow: hidden;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .data-table th, .data-table td {
          padding: 1rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }
        .data-table th {
          background-color: rgba(0, 0, 0, 0.2);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.875rem;
        }
        .btn-icon {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: var(--radius-btn);
          transition: background 0.2s;
        }
        .btn-icon:hover {
          background: rgba(239, 68, 68, 0.1);
        }
        .text-danger {
          color: var(--status-danger);
        }
      `}</style>
    </div>
  );
};
