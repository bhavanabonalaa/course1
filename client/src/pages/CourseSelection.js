import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import "../index.css";

export default function CourseSelection() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = useState({ theory: [], lab: [] });
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      API.get('/courses'),
      API.get('/teachers')
    ]).then(([coursesRes, teachersRes]) => {
      setCourses(coursesRes.data);
      setTeachers(teachersRes.data);
      setTimeout(() => setLoaded(true), 100);
    });
  }, []);

  const handleCourseSelect = (course, type) => {
    const exists = selected[type].find(c => c.courseId === course._id);
    if (exists) {
      setSelected(prev => ({
        ...prev,
        [type]: prev[type].filter(c => c.courseId !== course._id)
      }));
    } else {
      setSelected(prev => ({
        ...prev,
        [type]: [...prev[type], { courseId: course._id, teacherId: '' }]
      }));
    }
  };

  const handleTeacherSelect = (courseId, teacherId, type) => {
    setSelected(prev => ({
      ...prev,
      [type]: prev[type].map(c => c.courseId === courseId ? { ...c, teacherId } : c)
    }));
  };

  const handleSubmit = async () => {
    if (selected.theory.length !== 4 || selected.lab.length !== 2) {
      toast.error('You must select 4 theory and 2 lab courses.');
      return;
    }
    if ([...selected.theory, ...selected.lab].some(c => !c.teacherId)) {
      toast.error('All courses must have assigned teachers.');
      return;
    }
    try {
      await API.post('/courses/select', selected);
      toast.success('🎉 Selection submitted!');
      navigate('/feedback');
    } catch (err) {
      toast.error('Error submitting selection.');
    }
  };

  const theoryCount = selected.theory.length;
  const labCount = selected.lab.length;

  return (
    <div className="page-wrapper course-page">
      {/* Animated background orbs */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="container mt-4" style={{ position: 'relative', zIndex: 1 }}>
        {/* Page Header */}
        <div className="course-page-header">
          <div className="header-icon animate-bounce-in">📚</div>
          <h2 className="course-page-title animate-text-reveal">
            Course Selection
          </h2>
          <p className="course-page-desc animate-fade-in-delay">
            Choose your courses wisely and assign your preferred teachers
          </p>
        </div>
        
        {/* Progress Counter */}
        <div className="course-progress animate-fade-in-delay">
          <div className={`progress-card ${theoryCount === 4 ? 'progress-complete' : ''}`}>
            <div className="progress-ring">
              <svg viewBox="0 0 36 36">
                <path className="progress-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="progress-fill theory-fill" strokeDasharray={`${(theoryCount / 4) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="progress-number">{theoryCount}/4</span>
            </div>
            <span className="progress-label">Theory</span>
          </div>
          <div className={`progress-card ${labCount === 2 ? 'progress-complete' : ''}`}>
            <div className="progress-ring">
              <svg viewBox="0 0 36 36">
                <path className="progress-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="progress-fill lab-fill" strokeDasharray={`${(labCount / 2) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="progress-number">{labCount}/2</span>
            </div>
            <span className="progress-label">Lab</span>
          </div>
        </div>

        {/* Course Cards */}
        <div className="course-grid">
          {['theory', 'lab'].map((type, typeIndex) => (
            <div className={`course-card-wrapper animate-card-slide-${typeIndex === 0 ? 'left' : 'right'}`} key={type}>
              <div className="course-card">
                <div className="course-card-header">
                  <span className="course-card-icon">{type === 'theory' ? '📖' : '🔬'}</span>
                  <h4 className="course-card-title">
                    {type === 'theory' ? 'Theory Courses' : 'Lab Courses'}
                  </h4>
                  <span className="course-card-max">
                    max {type === 'theory' ? '4' : '2'}
                  </span>
                </div>
                <div className="course-card-body">
                  {courses.filter(c => c.type === type).map((course, index) => {
                    const isSelected = selected[type].some(c => c.courseId === course._id);
                    const assigned = selected[type].find(c => c.courseId === course._id)?.teacherId || '';
                    return (
                      <div 
                        className={`course-item-new ${isSelected ? 'course-item-active' : ''}`} 
                        key={course._id}
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        <div className="course-item-main" onClick={() => handleCourseSelect(course, type)}>
                          <div className={`custom-checkbox ${isSelected ? 'checked' : ''}`}>
                            {isSelected && <span className="check-icon">✓</span>}
                          </div>
                          <span className="course-name">{course.name}</span>
                          {isSelected && <span className="selected-badge">Selected</span>}
                        </div>
                        {isSelected && (
                          <div className="teacher-picker">
                            <select className="teacher-select"
                              value={assigned}
                              onChange={(e) => handleTeacherSelect(course._id, e.target.value, type)}>
                              <option value="">👨‍🏫 Choose Teacher...</option>
                              {teachers.map(t => (
                                <option key={t._id} value={t._id}>{t.name}</option>
                              ))}
                            </select>
                            {assigned && (
                              <button className="view-profile-btn"
                                onClick={() => navigate(`/teacher/${assigned}`)}>
                                View Profile →
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button className="submit-btn" onClick={handleSubmit}>
            <span className="submit-btn-bg"></span>
            <span className="submit-btn-text">✅ Submit Selection</span>
          </button>
        </div>
      </div>
    </div>
  );
}