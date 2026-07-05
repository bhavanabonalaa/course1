import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function MySelections() {
  const [selections, setSelections] = useState({ theory: [], lab: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/courses/selections')
      .then(res => {
        setSelections(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const hasSelections = selections.theory.length > 0 || selections.lab.length > 0;

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p className="loading-label">Loading your selections...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="container mt-4" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="selections-header animate-bounce-in">
          <span className="selections-icon">🎓</span>
        </div>
        <h2 className="selections-title animate-text-reveal">My Selected Courses</h2>
        <p className="selections-desc animate-fade-in-delay">
          {hasSelections 
            ? 'Here are the courses and teachers you have chosen' 
            : 'You haven\'t selected any courses yet'}
        </p>

        {!hasSelections ? (
          <div className="empty-state animate-card-entrance">
            <div className="empty-icon">📋</div>
            <h3 className="empty-title">No Courses Selected</h3>
            <p className="empty-text">Go to Course Selection to pick your courses and teachers.</p>
            <button className="btn-animated" onClick={() => navigate('/courses')} style={{ maxWidth: '280px', margin: '0 auto' }}>
              <span className="btn-text">📚 Select Courses</span>
              <span className="btn-arrow">→</span>
              <span className="btn-shine"></span>
            </button>
          </div>
        ) : (
          <div className="selections-grid">
            {/* Theory Courses */}
            {selections.theory.length > 0 && (
              <div className="selection-section animate-card-slide-left">
                <div className="section-header">
                  <span className="section-icon">📖</span>
                  <h3 className="section-title">Theory Courses</h3>
                  <span className="section-count">{selections.theory.length} courses</span>
                </div>
                <div className="section-body">
                  {selections.theory.map((item, index) => (
                    <div 
                      className="selection-item" 
                      key={index}
                      style={{ animationDelay: `${0.3 + index * 0.12}s` }}
                    >
                      <div className="selection-number">{index + 1}</div>
                      <div className="selection-info">
                        <h4 className="selection-course-name">
                          {item.courseId?.name || 'Unknown Course'}
                        </h4>
                        <div className="selection-teacher">
                          <span className="teacher-icon">👨‍🏫</span>
                          <span className="teacher-name-text">
                            {item.teacherId?.name || 'No teacher assigned'}
                          </span>
                        </div>
                        {item.teacherId?.background && (
                          <p className="teacher-bg-text">{item.teacherId.background}</p>
                        )}
                      </div>
                      {item.teacherId && (
                        <button 
                          className="view-profile-btn"
                          onClick={() => navigate(`/teacher/${item.teacherId._id}`)}
                        >
                          View →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Lab Courses */}
            {selections.lab.length > 0 && (
              <div className="selection-section animate-card-slide-right">
                <div className="section-header">
                  <span className="section-icon">🔬</span>
                  <h3 className="section-title">Lab Courses</h3>
                  <span className="section-count">{selections.lab.length} courses</span>
                </div>
                <div className="section-body">
                  {selections.lab.map((item, index) => (
                    <div 
                      className="selection-item" 
                      key={index}
                      style={{ animationDelay: `${0.5 + index * 0.12}s` }}
                    >
                      <div className="selection-number lab-number">{index + 1}</div>
                      <div className="selection-info">
                        <h4 className="selection-course-name">
                          {item.courseId?.name || 'Unknown Course'}
                        </h4>
                        <div className="selection-teacher">
                          <span className="teacher-icon">👨‍🏫</span>
                          <span className="teacher-name-text">
                            {item.teacherId?.name || 'No teacher assigned'}
                          </span>
                        </div>
                        {item.teacherId?.background && (
                          <p className="teacher-bg-text">{item.teacherId.background}</p>
                        )}
                      </div>
                      {item.teacherId && (
                        <button 
                          className="view-profile-btn"
                          onClick={() => navigate(`/teacher/${item.teacherId._id}`)}
                        >
                          View →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
