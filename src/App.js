import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import './App.css';
// import Auth from './components/Auth'; // Verify this path is correct
import { Auth } from "./components/auth";
import Register from './components/Register'; 
import Login from './components/Login'; 
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage'; // Componenta nouă
import ProfilePage from './components/ProfilePage'; // Componenta nouă
import Navbar from './components/Navbar'; // Importă componenta Navbar
import AddFilm from './components/AddFilm';
import Dashboard from './components/Dashboard';
import EditFilm from './components/EditFilm';


function App() {


  return (
    <Router>
      <AuthProvider>
        <div className="App">
          {/* <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link> {/* Adăugat link către profil */}
          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} /> {/* Adăugat ruta către profil */}
            <Route path="/add-film" element={<AddFilm />} /> {/* Noua rută adăugată */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit-film/:id" element={<EditFilm />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
