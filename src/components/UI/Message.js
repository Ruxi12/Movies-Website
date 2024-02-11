// src/components/UI/Message.js
import React from 'react';

const Message = ({ children, type = 'info' }) => {
  const className = `message ${type}`;
  return <div className={className}>{children}</div>;
};

export default Message;
