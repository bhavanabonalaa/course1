import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

export default function Feedback() {
  const [form, setForm] = useState({ teacherId: '', rating: 0, message: '' });
  const [teachers, setTeachers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedTeacherName, setSelectedTeacherName] = useState('');

  useEffect(() => {
    API.get('/teachers').then(res => setTeachers(res.data));
  }, []);

  const handleTeacherSelect = (teacher) => {
    // Calculate average rating from teacher's ratings array
    const avgRating = teacher.ratings && teacher.ratings.length > 0
      ? Math.round(teacher.ratings.reduce((a, b) => a + b, 0) / teacher.ratings.length)
      : 0;
    // Use functional update to avoid stale closure
    setForm(prev => ({ ...prev, teacherId: teacher._id, rating: avgRating }));
    setSelectedTeacherName(teacher.name);
  };

  const handleStarClick = (star) => {
    setForm(prev => ({ ...prev, rating: star }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.teacherId) { toast.error('Please select a teacher.'); return; }
    if (!form.rating) { toast.error('Please give a star rating.'); return; }
    setLoading(true);
    try {
      await API.post('/feedback', form);
      toast.success('🎉 Feedback submitted!');
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ teacherId: '', rating: 0, message: '' });
        setSelectedTeacherName('');
        setHoveredStar(0);
      }, 3000);
    } catch (err) {
      toast.error('Error submitting feedback.');
    } finally {
      setLoading(false);
    }
  };

  const starLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <div className="page-wrapper feedback-page">
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <div className={`feedback-card animate-card-entrance ${submitted ? 'success-glow' : ''}`}>

          {/* Header */}
          <div className="feedback-header">
            <div className={`feedback-icon-wrapper animate-bounce-in ${submitted ? 'submitted' : ''}`}>
              <span className="feedback-icon">{submitted ? '✅' : '💬'}</span>
            </div>
            <h2 className="feedback-title animate-text-reveal">
              {submitted ? 'Thank You!' : 'Submit Feedback'}
            </h2>
            <p className="feedback-subtitle animate-fade-in-delay">
              {submitted ? 'Your feedback has been recorded 🎉' : 'Share your experience with your teacher'}
            </p>
            <div className="feedback-divider"></div>
          </div>

          {!submitted && (
            <form onSubmit={handleSubmit} className="feedback-form">

              {/* Native Styled Teacher Select */}
              <div className="fb-field animate-slide-up-1">
                <label className="fb-label" htmlFor="teacherSelect">
                  <span className="fb-label-icon">👨‍🏫</span>
                  Select Teacher
                  {selectedTeacherName && (
                    <span className="fb-star-badge" style={{background:'rgba(102,126,234,0.2)',borderColor:'rgba(102,126,234,0.5)',color:'#a78bfa'}}>
                      ✓ {selectedTeacherName}
                    </span>
                  )}
                </label>
                <div className="fb-select-wrapper">
                  <select
                    id="teacherSelect"
                    className="fb-native-select"
                    value={form.teacherId}
                    onChange={(e) => {
                      const teacher = teachers.find(t => t._id === e.target.value);
                      if (teacher) handleTeacherSelect(teacher);
                    }}
                    required
                  >
                    <option value="">👨‍🏫 Choose your teacher...</option>
                    {teachers.map(t => (
                      <option key={t._id} value={t._id}>{t.name}</option>
                    ))}
                  </select>
                  <span className="fb-select-arrow">▾</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="fb-field animate-slide-up-2">
                <label className="fb-label">
                  <span className="fb-label-icon">⭐</span>
                  Rating
                  {form.rating > 0 && (
                    <span className="fb-star-badge">
                      {form.rating} / 5 — {starLabels[form.rating]}
                    </span>
                  )}
                  {hoveredStar > 0 && !form.rating && (
                    <span className="fb-rating-label">— {starLabels[hoveredStar]}</span>
                  )}
                </label>
                <div className="fb-section-sep"></div>
                <div className="fb-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`fb-star ${star <= (hoveredStar || form.rating) ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => handleStarClick(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="fb-field animate-slide-up-3">
                <label className="fb-label">
                  <span className="fb-label-icon">💭</span>
                  Your Feedback
                </label>
                <div className="fb-section-sep"></div>
                <textarea
                  name="message"
                  className="fb-textarea"
                  placeholder="Share your thoughts about the teacher..."
                  rows="4"
                  maxLength={500}
                  value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                />
                <div className={`fb-textarea-counter ${
                  form.message.length > 450 ? 'danger' : form.message.length > 350 ? 'warn' : ''
                }`}>
                  {form.message.length} / 500 characters
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`fb-submit-btn animate-slide-up-4 ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                <span className="fb-submit-bg"></span>
                <span className="fb-submit-text">
                  {loading ? (
                    <><span className="fb-spinner"></span> Submitting...</>
                  ) : (
                    <>Send Feedback →</>
                  )}
                </span>
              </button>

            </form>
          )}

          {submitted && (
            <div className="fb-success-body animate-fade-in-fast">
              <div className="fb-success-stars">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className="fb-success-star" style={{ animationDelay: `${s * 0.1}s` }}>★</span>
                ))}
              </div>
              <p className="fb-success-msg">Your rating has been saved and will help others make better choices!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}