// src/components/ProfilePage.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Message from './UI/Message';
import Button from './UI/Button';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Eroare la logout:", error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {currentUser ? (
        <>
          <Message type="success">Welcome, {currentUser.email}</Message>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <Message type="error">Please log in</Message>
      )}
    </div>
  );
};

export default ProfilePage;
