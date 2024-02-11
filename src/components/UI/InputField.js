// src/components/UI/InputField.js
import React from 'react';

const InputField = ({ type, value, onChange, placeholder, required, className }) => {
  return (
    <input
      type={type}
      className={`form-input ${className}`} // Aplică atât .form-input cât și orice clasă suplimentară
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};
export default InputField;
