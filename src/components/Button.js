// src/components/Button.js
import React from 'react';
import './FormStyles.css'; // Importează stilurile

const Button = ({ children, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="form-button"
    >
      {children}
    </button>
  );
};

export default Button;
