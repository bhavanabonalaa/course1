import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

export default function TeacherProfile() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    API.get(`/teachers/${id}`).then(res => setTeacher(res.data));
  }, [id]);

  if (!teacher) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card2 p-4 shadow">
        <h3 id="teacher">{teacher.name}</h3>
        <p><strong>Background:</strong> {teacher.background}</p>
        <p><strong>Research Projects:</strong> {teacher.research}</p>
        <p><strong>Patents:</strong> {teacher.patents}</p>
        <p><strong>Ratings (last 4 years):</strong> {teacher.ratings?.join(', ')}</p>
      </div>
    </div>
  );
}