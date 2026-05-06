import React, { useState, useEffect } from 'react';
import { ClientLayout } from './Sessions';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ClientProfile = () => {
  const { profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    age: '',
    height: '',
    weight: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        username: profile.username || '',
        age: profile.age || '',
        height: profile.height || '',
        weight: profile.weight || ''
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    const updates = {
      name: formData.name,
      username: formData.username,
      age: formData.age ? parseInt(formData.age) : null,
      height: formData.height ? parseFloat(formData.height) : null,
      weight: formData.weight ? parseFloat(formData.weight) : null
    };

    const { error } = await updateProfile(updates);
    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    }
    setLoading(false);
  };

  return (
    <ClientLayout activePath="/client/profile">
      <div className="bg-card border rounded-md p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl mb-6">Account Settings</h2>
        
        {message.text && (
          <div className={`p-4 mb-6 rounded-md ${message.type === 'error' ? 'bg-red-900/20 text-red-500 border border-red-500/50' : 'bg-green-900/20 text-green-500 border border-green-500/50'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
          
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg mb-4">Physical Attributes</h3>
            <div className="flex gap-4">
              <Input label="Age" type="number" name="age" value={formData.age} onChange={handleChange} />
              <Input label="Height (cm)" type="number" name="height" value={formData.height} onChange={handleChange} />
              <Input label="Weight (lbs)" type="number" name="weight" value={formData.weight} onChange={handleChange} />
            </div>
          </div>
          
          <div className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .border { border: 1px solid var(--border-color); }
        .border-t { border-top: 1px solid var(--border-color); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-6 { padding: 2rem; }
        .pt-4 { padding-top: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-4 { margin-top: 1rem; }
        .max-w-2xl { max-width: 600px; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .gap-4 { gap: 1rem; }
        .text-2xl { font-size: 1.5rem; font-weight: 600; margin: 0; }
        .text-lg { font-size: 1.125rem; font-weight: 600; margin: 0; }
      `}</style>
    </ClientLayout>
  );
};
