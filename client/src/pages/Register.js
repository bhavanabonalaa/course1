import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/register', form);
      // Show custom popup instead of just toast
      setShowSuccessPopup(true);
      
      // Delay navigation for animation
      setTimeout(() => {
        navigate('/login');
      }, 2500);
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    } 
  };

  return (
    <div className="page-wrapper">
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="success-popup-overlay animate-fade-in-fast">
          <div className="success-popup-card animate-scale-up-bounce">
            <div className="success-popup-icon-wrapper animate-spin-success">
              <span className="success-popup-icon">✅</span>
            </div>
            <h2 className="success-popup-title">Registration Successful!</h2>
            <p className="success-popup-text">We're redirecting you to login...</p>
            <div className="success-popup-loader"></div>
          </div>
        </div>
      )}

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
            <span className="form-icon">📝</span>
          </div>
          <h2 className="form-title animate-text-reveal">Create Account</h2>
          <p className="form-subtitle animate-fade-in-delay">Join us and start your academic journey</p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group-animated animate-slide-up-1">
              <span className="input-icon">👤</span>
              <input 
                name="name" 
                className="form-control" 
                placeholder="Full Name" 
                onChange={handleChange} 
                required 
                autoComplete='off' 
              />
              <div className="input-highlight"></div>
            </div>

            <div className="input-group-animated animate-slide-up-2">
              <span className="input-icon">📧</span>
              <input 
                name="email" 
                type="email"
                className="form-control" 
                placeholder="Email Address" 
                onChange={handleChange} 
                required 
                autoComplete='off'
              />
              <div className="input-highlight"></div>
            </div>

            <div className="input-group-animated animate-slide-up-3">
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

            <button type="submit" className="btn-animated animate-slide-up-4" disabled={loading}>
              <span className="btn-text">{loading ? 'Creating Account...' : 'Register Now'}</span>
              <span className="btn-shine"></span>
              {!loading && <span className="btn-arrow">→</span>}
            </button>
          </form>

          <p className="form-footer animate-slide-up-4">
            Already have an account?{' '}
            <Link to="/login" className="form-link">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}