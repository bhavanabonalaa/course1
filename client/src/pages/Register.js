import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      toast.success('Registered successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="form-card p-4 shadow" >
        <h2 className="text-center mb-3" id="name">Register</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" className="form-control mb-3" placeholder="Name" onChange={handleChange} required autoComplete='off' />
          <input name="email" className="form-control mb-3" placeholder="Email" onChange={handleChange} required autoComplete='off'/>
          <input name="password" type="password" className="form-control mb-3" autoComplete='new-password' placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="btn btn-primary w-90">Register</button>
        </form>
      </div>
    </div>
  );
}