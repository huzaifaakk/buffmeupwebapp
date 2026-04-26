import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSocial = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          likes (user_id),
          comments (
            id, 
            content, 
            created_at, 
            user_id
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      if (postsData && postsData.length > 0) {
        // Collect all user IDs from posts and comments
        const userIds = new Set();
        postsData.forEach(p => {
          userIds.add(p.user_id);
          p.comments?.forEach(c => userIds.add(c.user_id));
        });

        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, username, avatar_url, name')
          .in('id', Array.from(userIds));

        const combined = postsData.map(p => ({
          ...p,
          profiles: profilesData?.find(prof => prof.id === p.user_id),
          comments: p.comments?.map(c => ({
            ...c,
            profiles: profilesData?.find(prof => prof.id === c.user_id)
          }))
        }));
        setPosts(combined);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('social_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => fetchPosts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, () => fetchPosts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'likes' }, () => fetchPosts())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('posts')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('posts')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error("Error uploading image:", err);
      return null;
    }
  };

  const createPost = async (userId, content, imageFile = null, profile = null) => {
    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { data, error } = await supabase
        .from('posts')
        .insert([
          { 
            user_id: userId, 
            content, 
            image_url: imageUrl, 
            post_type: 'text',
            username: profile?.username || 'Athlete',
            user_avatar: profile?.avatar_url
          }
        ])
        .select();
      
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("Error creating post:", err);
      return { data: null, error: err };
    }
  };

  const toggleLike = async (postId, userId) => {
    try {
      const { data: existingLike, error: fetchError } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingLike) {
        const { error } = await supabase.from('likes').delete().eq('id', existingLike.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('likes').insert([{ post_id: postId, user_id: userId }]);
        if (error) throw error;
      }
      // Manual refetch for immediate UI update
      await fetchPosts();
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const addComment = async (postId, userId, content, profile = null) => {
    try {
      const { error } = await supabase.from('comments').insert([
        { 
          post_id: postId, 
          user_id: userId, 
          content,
          username: profile?.username || 'User'
        }
      ]);
      if (error) throw error;
      // Manual refetch for immediate UI update
      await fetchPosts();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return { posts, loading, createPost, toggleLike, addComment, uploadImage, refetch: fetchPosts };
};
