import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

export default function Feedback() {
  const [form, setForm] = useState({ teacherId: '', rating: '', message: '' });
  const [teachers, setTeachers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get('/teachers').then(res => setTeachers(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/feedback', form);
      toast.success('🎉 Feedback submitted!');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setForm({ teacherId: '', rating: '', message: '' });
    } catch (err) {
      toast.error('Error submitting feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
        <div className={`form-card animate-card-entrance ${submitted ? 'success-glow' : ''}`}>
          <div className="form-icon-wrapper animate-bounce-in">
            <span className="form-icon">{submitted ? '✅' : '💬'}</span>
          </div>
          <h2 className="form-title animate-text-reveal">
            {submitted ? 'Thank You!' : 'Submit Feedback'}
          </h2>
          <p className="form-subtitle animate-fade-in-delay">
            {submitted ? 'Your feedback has been recorded' : 'Help us improve by sharing your thoughts'}
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="input-group-animated animate-slide-up-1">
              <span className="input-icon">👨‍🏫</span>
              <select 
                name="teacherId" 
                className="form-control" 
                value={form.teacherId}
                onChange={handleChange} 
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
              <div className="input-highlight"></div>
            </div>

            <div className="input-group-animated animate-slide-up-2">
              <span className="input-icon">⭐</span>
              <input 
                name="rating" 
                type="number" 
                className="form-control" 
                placeholder="Rating (1-5)" 
                min="1" 
                max="5" 
                value={form.rating}
                onChange={handleChange} 
                required 
              />
              <div className="input-highlight"></div>
            </div>

            <div className="input-group-animated animate-slide-up-3">
              <span className="input-icon" style={{ alignSelf: 'flex-start', marginTop: '14px' }}>💭</span>
              <textarea 
                name="message" 
                className="form-control" 
                placeholder="Your feedback message..." 
                rows="4"
                value={form.message}
                onChange={handleChange}
                style={{ resize: 'vertical', minHeight: '100px' }}
              ></textarea>
              <div className="input-highlight"></div>
            </div>

            <button type="submit" className="btn-animated animate-slide-up-4" disabled={loading}>
              <span className="btn-text">{loading ? 'Submitting...' : 'Send Feedback'}</span>
              <span className="btn-shine"></span>
              {!loading && <span className="btn-arrow">→</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}