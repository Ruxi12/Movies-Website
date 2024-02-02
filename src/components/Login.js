// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; // Ajustează calea conform structurii tale de proiect
import './Login.css'; // Asumăm că ai un fișier CSS pentru stilizare
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (event) => {
      event.preventDefault();
      setError('');
      setSuccess('');
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Autentificare reușită:", userCredential.user);
        setSuccess('Autentificare reușită!');
        //navigate('/'); // Redirect la pagina principală sau dashboard
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;