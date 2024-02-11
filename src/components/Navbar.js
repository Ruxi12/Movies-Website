import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './UI/Button'; 
import '../components/FormStyles.css'
import Dashboard from './Dashboard'; 

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Eroare la logout:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {!currentUser && <Link to="/login" className="nav-link">Login</Link>}
      {!currentUser && <Link to="/register" className="nav-link">Register</Link>}
      {currentUser && <Link to="/profile" className="nav-link">Profile</Link>}
      {currentUser && <Link to="/add-film" className="nav-link">Adaugă Film</Link>}
      {currentUser && <Link to="/dashboard" className="nav-link">Dashboard</Link>} {/* Link nou adăugat */}
      {currentUser && <Button onClick={handleLogout} className="nav-button">Logout</Button>}
      
    </nav>
  );
};

export default Navbar;
