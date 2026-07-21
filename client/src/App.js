import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import CourseSelection from './pages/CourseSelection';
import Feedback from './pages/Feedback';
import TeacherProfile from './pages/TeacherProfile';
import MySelections from './pages/MySelections';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';


function AppWrapper() {
  const location = useLocation();

  // Beautiful Pexels background images for each page
  const backgrounds = {
    '/': 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=1920',
    '/register': 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920',
    '/login': 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1920',
    '/courses': 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1920',
    '/feedback': 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920',
    '/my-selections': 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1920'
  };

  const backgroundImage = backgrounds[location.pathname] || backgrounds['/'];

  return (
    <div
      className="app-container"
      style={location.pathname === '/' ? {
        backgroundColor: '#0a0f1e',
        minHeight: '100vh'
      } : {
        backgroundImage: `linear-gradient(135deg, rgba(10, 15, 30, 0.82), rgba(20, 30, 80, 0.72)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
    >
      <Navbar />

      {location.pathname === '/' && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="background-video"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-students-studying-together-in-college-4494-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          
          <div className="welcome-container">
            <div className="welcome-card">
              <h1 className="welcome-title">
                Welcome to
              </h1>
              <h2 className="welcome-subtitle">
                Course Selection & Teacher Assignment
              </h2>
              <p className="welcome-description">
                Choose your courses, pick your teachers, and shape your academic journey.
              </p>
              <div className="welcome-features">
                <div className="feature-badge">📚 Select Courses</div>
                <div className="feature-badge">👨‍🏫 Choose Teachers</div>
                <div className="feature-badge">⭐ Give Feedback</div>
              </div>
            </div>
          </div>
        </>
      )}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<PrivateRoute><CourseSelection /></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
        <Route path="/teacher/:id" element={<PrivateRoute><TeacherProfile /></PrivateRoute>} />
        <Route path="/my-selections" element={<PrivateRoute><MySelections /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
      <ToastContainer position='top-right' autoClose={3000}/>
    </Router>
  );
}

export default App;