import React, { useState } from 'react';
import { SidebarLayout } from '../../components/ui/Layouts';
import { trainerLinks } from './Dashboard';
import { useTrainerClients } from '../../hooks/useUsers';
import { useMessages } from '../../hooks/useMessages';
import { useAuth } from '../../context/AuthContext';
import { Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const TrainerMessages = () => {
  const { profile } = useAuth();
  const { clients, loading: loadingClients } = useTrainerClients(profile?.id);
  const [selectedClient, setSelectedClient] = useState(null);
  const { messages, sendMessage, loading: loadingMessages } = useMessages(selectedClient?.profiles?.id);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <SidebarLayout title="Messages" links={trainerLinks}>
        <div className="bg-card border rounded-md overflow-hidden fade-in flex" style={{ height: '600px' }}>
          
          {/* Sidebar */}
          <div className="sidebar-list border-r">
            <div className="p-4 border-b">
              <h3 className="text-lg">Clients</h3>
            </div>
            <div className="client-list-scroll">
              {loadingClients ? (
                <div className="p-4 text-secondary text-sm">Loading...</div>
              ) : clients.length > 0 ? (
                clients.map(client => (
                  <div 
                    key={client.id} 
                    className={`client-item-nav ${selectedClient?.id === client.id ? 'active' : ''}`}
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.profiles?.name || client.profiles?.username}
                  </div>
                ))
              ) : (
                <div className="p-4 text-secondary text-sm">No clients found</div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chat-area flex-1 flex flex-col bg-sidebar">
            {selectedClient ? (
              <>
                <div className="chat-header p-4 border-b bg-card">
                  <h3 className="font-semibold">{selectedClient.profiles?.name || selectedClient.profiles?.username}</h3>
                </div>
                <div className="messages-display flex-1 p-4 overflow-y-auto flex flex-col gap-2">
                  {loadingMessages ? (
                    <div className="text-center text-secondary">Loading messages...</div>
                  ) : messages.length > 0 ? (
                    messages.map((msg, i) => (
                      <div key={i} className={`msg-bubble ${msg.sender_id === profile?.id ? 'sent' : 'received'}`}>
                        {msg.content}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-secondary mt-10">No messages yet. Say hi!</div>
                  )}
                </div>
                <form className="chat-input-area p-4 border-t bg-card flex gap-2" onSubmit={handleSendMessage}>
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="flex-1 bg-sidebar border rounded-md px-3 outline-none focus:border-accent-primary"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send size={18} />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-secondary">
                <p>Select a client to start messaging</p>
              </div>
            )}
          </div>

        </div>
      </SidebarLayout>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .border { border: 1px solid var(--border-color); }
        .border-r { border-right: 1px solid var(--border-color); }
        .border-b { border-bottom: 1px solid var(--border-color); }
        .border-t { border-top: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .overflow-hidden { overflow: hidden; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .flex-1 { flex: 1; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .p-4 { padding: 1rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .gap-2 { gap: 0.5rem; }
        .text-lg { font-size: 1.125rem; font-weight: 600; margin: 0; }
        .text-sm { font-size: 0.875rem; }
        .text-secondary { color: var(--text-secondary); }
        .text-center { text-align: center; }
        .mt-10 { margin-top: 2.5rem; }
        .font-semibold { font-weight: 600; }
        
        .sidebar-list { width: 250px; background-color: var(--bg-card); }
        .client-list-scroll { overflow-y: auto; height: 100%; }
        .client-item-nav { padding: 1rem; cursor: pointer; transition: background 0.2s; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .client-item-nav:hover { background-color: rgba(0, 210, 255, 0.05); }
        .client-item-nav.active { background-color: rgba(0, 210, 255, 0.1); color: var(--accent-primary); border-right: 2px solid var(--accent-primary); }
        
        .messages-display { scrollbar-width: thin; }
        .msg-bubble { max-width: 70%; padding: 0.75rem 1rem; border-radius: var(--radius-card); font-size: 0.9375rem; line-height: 1.4; }
        .msg-bubble.sent { align-self: flex-end; background-color: var(--accent-primary); color: white; border-bottom-right-radius: 4px; }
        .msg-bubble.received { align-self: flex-start; background-color: var(--bg-card); border: 1px solid var(--border-color); border-bottom-left-radius: 4px; }
      `}</style>
    </div>
  );
};
