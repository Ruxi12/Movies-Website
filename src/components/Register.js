// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase'; 
import './Register.css'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import corect pentru Firebase v9+
import InputField  from './InputField';
import Button from './Button';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      setError('');
      //await auth.createUserWithEmailAndPassword(email, password);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Utilizator înregistrat cu succes:", userCredential.user);
      // Procesează utilizatorul înregistrat după caz
      navigate('/'); // Navighează către pagina principală după înregistrare
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
