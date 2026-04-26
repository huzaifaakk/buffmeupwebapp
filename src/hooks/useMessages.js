import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * SQL SETUP REQUIRED:
 * 
 * CREATE TABLE messages (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   sender_id UUID REFERENCES profiles(id),
 *   receiver_id UUID REFERENCES profiles(id),
 *   content TEXT NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users can see their own messages" ON messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
 * CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
 */

export const useMessages = (receiverId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    if (!receiverId) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('messages_channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => {
        fetchMessages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [receiverId]);

  const sendMessage = async (content) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !receiverId) return;

      const { error } = await supabase
        .from('messages')
        .insert([{ sender_id: user.id, receiver_id: receiverId, content }]);

      if (error) throw error;
      fetchMessages();
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Make sure the 'messages' table exists in Supabase.");
    }
  };

  return { messages, loading, sendMessage, refetch: fetchMessages };
};
