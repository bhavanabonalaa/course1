import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('🎉 Welcome back!');
      navigate('/courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Floating particles */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
        <div className="form-card animate-card-entrance">
          <div className="form-icon-wrapper animate-bounce-in">
            <span className="form-icon">🔐</span>
          </div>
          <h2 className="form-title animate-text-reveal">Welcome Back</h2>
          <p className="form-subtitle animate-fade-in-delay">Sign in to continue your journey</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group-animated animate-slide-up-1">
              <span className="input-icon">📧</span>
              <input 
                name="email" 
                type="email"
                className="form-control" 
                placeholder="Email Address" 
                autoComplete='off' 
                onChange={handleChange} 
                required 
              />
              <div className="input-highlight"></div>
            </div>

            <div className="input-group-animated animate-slide-up-2">
              <span className="input-icon">🔒</span>
              <input 
                name="password" 
                type="password" 
                className="form-control" 
                autoComplete='new-password' 
                placeholder="Password" 
                onChange={handleChange} 
                required 
              />
              <div className="input-highlight"></div>
            </div>

            <button type="submit" className="btn-animated animate-slide-up-3" disabled={loading}>
              <span className="btn-text">{loading ? 'Signing in...' : 'Sign In'}</span>
              <span className="btn-shine"></span>
              {!loading && <span className="btn-arrow">→</span>}
            </button>
          </form>

          <p className="form-footer animate-slide-up-4">
            Don't have an account?{' '}
            <Link to="/register" className="form-link">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}