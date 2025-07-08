import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

export default function Feedback() {
  const [form, setForm] = useState({ teacherId: '', rating: '', message: '' });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    API.get('/teachers').then(res => setTeachers(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/feedback', form);
      toast.success('Feedback submitted!');
    } catch (err) {
      toast.error('Error submitting feedback.');
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4 shadow" style={{ width: '1000px', backgroundColor:"#ffcbcb", marginTop:"30%"}}>
        <h2 className="text-center mb-3" id="name">Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          <select name="teacherId" className="form-select mb-3" id="select1" onChange={handleChange} required>
            <option value="">Select Teacher</option>
            {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>
          <input name="rating" type="number" className="form-control mb-3" id="select1" placeholder="Rating (1-5)" min="1" max="5" onChange={handleChange} required />
          <textarea name="message" className="form-control mb-3" id="select1" placeholder="Your feedback..." onChange={handleChange}></textarea>
          <button id ="feedbtn" type="submit" className="btn btn-success w-90"  >Submit</button>
        </form>
      </div>
    </div>
  );
}