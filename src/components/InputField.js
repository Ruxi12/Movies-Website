// src/components/InputField.js
import React from 'react';
import './FormStyles.css'; // Importează stilurile

const InputField = ({ type, value, onChange, placeholder, required }) => {
  return (
    <input
      type={type}
      className="form-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default InputField;
