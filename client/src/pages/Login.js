import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Logged in!');
      navigate('/courses');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="form-card p-4 shadow" >
        <h2 className="text-center mb-3" id="name">Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" className="form-control mb-3" placeholder="Email" autoComplete='off' onChange={handleChange} required />
          <input name="password" type="password" className="form-control mb-3" autoComplete='new-password' placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="btn btn-success w-90">Login</button>
        </form>
      </div>
    </div>
  );
}