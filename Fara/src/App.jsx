import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Items from './pages/Items';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Search from './pages/Search';
import RecommendedEvents from './pages/RecommendedEvents';
import ContactsList from './pages/ContactsList';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Chatbot from './pages/Chatbot';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

  // Sync React state with localStorage on initial load
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    const storedRole = localStorage.getItem("role") || null;

    if (storedAuth !== isAuthenticated) setIsAuthenticated(storedAuth);
    if (storedRole !== userRole) setUserRole(storedRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update localStorage whenever auth or role changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
      if (userRole) localStorage.setItem("role", userRole);
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      setUserRole(null);
    }
  }, [isAuthenticated, userRole]);

  return (
    <Router>
      {/* Show Navbar only if authenticated */}
      {isAuthenticated && (
        <Navbar
          userRole={userRole}
          setIsAuthenticated={setIsAuthenticated}
          setUserRole={setUserRole}
        />
      )}

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserRole={setUserRole}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/services"
          element={isAuthenticated ? <Services /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/items"
          element={isAuthenticated ? <Items /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/about"
          element={isAuthenticated ? <About /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/blog"
          element={isAuthenticated ? <Blog /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/contact"
          element={isAuthenticated ? <Contact /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/search"
          element={isAuthenticated ? <Search /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/recommend"
          element={isAuthenticated ? <RecommendedEvents /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <Chatbot /> : <Navigate to="/login" replace />}
        />

        {/* Admin only */}
        <Route
          path="/admin/contacts"
          element={
            isAuthenticated && userRole === "admin" ? (
              <>
                <AdminDashboard />
                <ContactsList />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback route */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
