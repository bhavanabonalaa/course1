import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';
import "../index.css";

export default function CourseSelection() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = useState({ theory: [], lab: [] });
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/courses').then(res => setCourses(res.data));
    API.get('/teachers').then(res => setTeachers(res.data));
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
      toast.success('Selection submitted!');
      navigate('/feedback');
    } catch (err) {
      toast.error('Error submitting selection.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" id="name1">Course Selection</h2>
      <div className="row" id="cardd">
        {['theory', 'lab'].map(type => (
          <div className="col-md-6" key={type} id="cardb">
            <div className="card p-3 shadow" >
              <h4 className="mb-3" id="sub-head">{type === 'theory' ? 'Theory Courses(max 4)' : 'Lab Courses(max 2)'}</h4>
              {courses.filter(c => c.type === type).map(course => {
                const isSelected = selected[type].some(c => c.courseId === course._id);
                const assigned = selected[type].find(c => c.courseId === course._id)?.teacherId || '';
                return (
                  <div className="mb-3" key={course._id}>
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input"
                        checked={isSelected}
                        onChange={() => handleCourseSelect(course, type)} />
                      <label className="form-check-label fw-bold">{course.name}</label>
                    </div>
                    {isSelected && (
                      <div className="d-flex mt-2">
                        <select className="form-select me-2" id="inner-sel"
                          value={assigned}
                          onChange={(e) => handleTeacherSelect(course._id, e.target.value, type)}>
                          <option value="">Select Teacher</option>
                          {teachers.map(t => (
                            <option key={t._id} value={t._id}>{t.name}</option>
                          ))}
                        </select>
                        {assigned && (
                          <button className="btn btn-outline-secondary btn-sm" id="view"
                            onClick={() => navigate(`/teacher/${assigned}`)}>View Profile</button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4" id="cs">
        <button type="submit" className="btn btn-success" onClick={handleSubmit} id="cousub">Submit</button>
      </div>
    </div>
  );
}