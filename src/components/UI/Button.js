// src/components/UI/Button.js
import React from 'react';

const Button = ({ children, onClick, variant = 'primary', ...props }) => {
  const className = `button ${variant}`;
  return (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
