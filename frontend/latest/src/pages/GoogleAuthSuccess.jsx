import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      login(token);
      setTimeout(() => {
        navigate('/'); // You can redirect to /student or /driver based on role if desired
      }, 500);
    }
  }, [login, navigate]);

  return <div className="text-center mt-20 text-lg">Logging you in...</div>;
};

export default GoogleAuthSuccess;