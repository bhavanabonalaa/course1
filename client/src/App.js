import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import CourseSelection from './pages/CourseSelection';
import Feedback from './pages/Feedback';
import TeacherProfile from './pages/TeacherProfile';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';


function AppWrapper() {
  const location = useLocation();

  // Map routes to image filenames
  const backgrounds = {
    '/': 'bg-home.jpg',
    '/register': 'bg-login.jpg',
    '/login': 'bg-login1.jpeg',
    '/courses': 'bg-courses.jpg',
    '/feedback': 'bg-feedback.jpg'
  };
   
  const backgroundImage = backgrounds[location.pathname] || 'bg-home.jpg';

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <Navbar />

      {location.pathname === '/' && (
        <div className="welcome-container">
          <h1 className="welcome-text">
            Welcome to <br />Course Selection and Teacher Assignment Website
          </h1>
        </div>
      )}

      <Routes>
        <Route path="/register" element={<Register />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<PrivateRoute><CourseSelection /></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
        <Route path="/teacher/:id" element={<PrivateRoute><TeacherProfile /></PrivateRoute>} />

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