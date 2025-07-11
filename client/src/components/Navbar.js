import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create this file next

export default function Navbar() {
 
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark gradient-navbar px-4">
      <Link to="/" className="nav-head" id="head">Course Selection</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/courses">Courses</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/feedback">Feedback</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}