import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { Shield, User, ArrowLeft } from 'lucide-react';
import buffmeupLogo from '../../assets/buffmeuplogo.webp';

export const Register = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    age: '',
    height: '',
    weight: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signUpError } = await signUp(
      formData.email,
      formData.password,
      role,
      formData.name,
      formData.username,
      formData.age,
      formData.height,
      formData.weight
    );

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="absolute top-8 right-8">
        <ThemeToggle />
      </div>

      <div className={`auth-card fade-in ${step === 1 ? 'wide-card' : ''}`}>

        {step === 1 && (
          <div className="role-selection">
            <h2 className="auth-title">Join <img src={buffmeupLogo} alt="BUFFMEUP" className="inline-logo" /></h2>
            <p className="auth-subtitle">Select your role to get started</p>

            <div className="role-grid">
              <button className="role-card" onClick={() => handleRoleSelect('client')}>
                <div className="role-icon-wrapper client">
                  <User size={32} />
                </div>
                <h3>Client</h3>
                <p>Track workouts, follow plans, and reach your goals.</p>
              </button>

              <button className="role-card" onClick={() => handleRoleSelect('trainer')}>
                <div className="role-icon-wrapper trainer">
                  <img src={buffmeupLogo} alt="BuffMeUp Logo" style={{ width: '32px', height: '32px' }} />
                </div>
                <h3>Trainer</h3>
                <p>Manage clients, create plans, and grow your business.</p>
              </button>

              <button className="role-card" onClick={() => handleRoleSelect('admin')}>
                <div className="role-icon-wrapper admin">
                  <Shield size={32} />
                </div>
                <h3>Admin</h3>
                <p>Oversee the platform, users, and global content.</p>
              </button>
            </div>

            <div className="auth-links">
              <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="registration-form fade-in">
            <button className="back-link" onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Back to role selection
            </button>
            <h2 className="auth-title">Create {role} Account</h2>
            <p className="auth-subtitle">Complete your profile details</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleRegister} className="auth-form">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
              <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="johndoe"
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />

              {role === 'client' && (
                <div className="flex gap-4">
                  <Input
                    label="Age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    placeholder="25"
                  />
                  <Input
                    label="Height (cm)"
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    placeholder="180"
                  />
                  <Input
                    label="Weight (lbs)"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    placeholder="185"
                  />
                </div>
              )}

              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? 'Creating Account...' : 'Complete Sign Up'}
              </Button>
            </form>
          </div>
        )}

      </div>
      <style>{`
        .absolute { position: absolute; }
        .top-8 { top: 2rem; }
        .right-8 { right: 2rem; }
        .mt-4 { margin-top: 1rem; }

        .wide-card { max-width: 900px; }

        .role-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 2.5rem;
        }

        .role-card {
          background-color: var(--bg-color);
          border: 2px solid var(--border-color);
          padding: 2rem 1.5rem;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-primary);
        }

        .role-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-8px);
          box-shadow: 0 12px 24px -8px rgba(0, 210, 255, 0.3);
          background-color: var(--bg-card);
        }

        .role-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .role-icon-wrapper.client { background: rgba(0, 210, 255, 0.1); color: var(--accent-primary); }
        .role-icon-wrapper.trainer { background: rgba(34, 197, 94, 0.1); color: var(--status-success); }
        .role-icon-wrapper.admin { background: rgba(148, 163, 184, 0.1); color: var(--text-secondary); }

        .role-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .role-card p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: var(--accent-primary);
        }

        @media (max-width: 640px) {
          .role-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
