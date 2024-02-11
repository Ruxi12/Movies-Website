// src/components/Login.js
import React, { useState } from 'react';
import InputField  from './InputField';
import Button from './Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        navigate('/'); // Redirect la pagina principală sau dashboard
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
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit">Login</Button>
          <div className="register-link"> 
          Nu ai cont? <Link to="/register">Înregistrează-te</Link>
          </div>
        </form>

      </div>
    );
  };
  
  export default Login;