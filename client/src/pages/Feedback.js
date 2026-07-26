import React, { useEffect, useState, useRef } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

export default function Feedback() {
  const [form, setForm] = useState({ teacherId: '', rating: 0, message: '' });
  const [teachers, setTeachers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedTeacherName, setSelectedTeacherName] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    API.get('/teachers').then(res => setTeachers(res.data));
  }, []);

  // Close dropdown when clicking outside — use 'click' so item onClick fires first
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleTeacherSelect = (teacher) => {
    // Calculate average rating from teacher's ratings array
    const avgRating = teacher.ratings && teacher.ratings.length > 0
      ? Math.round(teacher.ratings.reduce((a, b) => a + b, 0) / teacher.ratings.length)
      : 0;
    // Use functional update to avoid stale closure
    setForm(prev => ({ ...prev, teacherId: teacher._id, rating: avgRating }));
    setSelectedTeacherName(teacher.name);
    setDropdownOpen(false);
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

              {/* Custom Teacher Dropdown */}
              <div className="fb-field animate-slide-up-1">
                <label className="fb-label">
                  <span className="fb-label-icon">👨‍🏫</span>
                  Select Teacher
                </label>
                <div className="fb-dropdown-wrapper" ref={dropdownRef}>
                  <button
                    type="button"
                    className={`fb-dropdown-trigger ${dropdownOpen ? 'open' : ''} ${form.teacherId ? 'selected' : ''}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="fb-dropdown-value">
                      {selectedTeacherName || 'Choose your teacher...'}
                    </span>
                    <span className={`fb-dropdown-arrow ${dropdownOpen ? 'rotated' : ''}`}>▾</span>
                  </button>

                  <div className={`fb-dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                    <div className="fb-dropdown-search-hint">Select a teacher</div>
                    {teachers.map((teacher, index) => (
                      <div
                        key={teacher._id}
                        className={`fb-dropdown-item ${form.teacherId === teacher._id ? 'active' : ''}`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        onMouseDown={(e) => { e.preventDefault(); handleTeacherSelect(teacher); }}
                        onClick={() => handleTeacherSelect(teacher)}
                      >
                        <span className="fb-dropdown-item-avatar">
                          {teacher.name.charAt(0).toUpperCase()}
                        </span>
                        <div className="fb-dropdown-item-info">
                          <span className="fb-dropdown-item-name">{teacher.name}</span>
                          <span className="fb-dropdown-item-bg">{teacher.background?.slice(0, 40)}...</span>
                        </div>
                        {form.teacherId === teacher._id && (
                          <span className="fb-dropdown-check">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="fb-field animate-slide-up-2">
                <label className="fb-label">
                  <span className="fb-label-icon">⭐</span>
                  Rating
                  {(hoveredStar || form.rating) > 0 && (
                    <span className="fb-rating-label">
                      — {starLabels[hoveredStar || form.rating]}
                    </span>
                  )}
                </label>
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
                <textarea
                  name="message"
                  className="fb-textarea"
                  placeholder="Share your thoughts about the teacher..."
                  rows="4"
                  value={form.message}
                  onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                />
                <div className="fb-textarea-counter">{form.message.length} / 500 characters</div>
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