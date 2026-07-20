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

  // Beautiful Unsplash background images for each page
  const backgrounds = {
    '/': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80',
    '/register': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80',
    '/login': 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1920&q=80',
    '/courses': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80',
    '/feedback': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80',
    '/my-selections': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1920&q=80'
  };

  const backgroundImage = backgrounds[location.pathname] || backgrounds['/'];

  return (
    <div
      className="app-container"
      style={location.pathname === '/' ? {} : {
        backgroundImage: `linear-gradient(135deg, rgba(10, 15, 30, 0.85), rgba(20, 30, 80, 0.75)), url(${backgroundImage})`,
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
            <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-books-in-a-library-reading-room-42646-large.mp4" type="video/mp4" />
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