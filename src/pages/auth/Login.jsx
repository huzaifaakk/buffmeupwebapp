import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import buffmeupLogo from '../../assets/buffmeuplogo.webp';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>

      <div className="auth-card fade-in">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your <img src={buffmeupLogo} alt="BUFFMEUP" className="inline-logo-small" /> account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="auth-links">
          <p>Don't have an account? <Link to="/register" className="auth-link">Create one now</Link></p>
        </div>
      </div>
      <style>{`
        .absolute { position: absolute; }
        .top-8 { top: 2rem; }
        .right-8 { right: 2rem; }
      `}</style>
    </div>
  );
};
