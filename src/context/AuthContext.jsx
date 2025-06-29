// src/context/AuthContext.jsx final
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    if (tokens) {
        try {
            return jwtDecode(JSON.parse(tokens).access);
        } catch (e) {
            console.error("Invalid token:", e);
            localStorage.removeItem('authTokens');
            return null;
        }
    }
    return null;
  });
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || null);
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      // Step 1: Login using your custom endpoint
      const data = await authService.login(username, password);
      
      // Step 2: After successful login, check the user's role
      const role = await authService.getUserRole(data.access);
      
      const decodedUser = jwtDecode(data.access);
      
      // Step 3: Set all state and local storage
      setAuthTokens(data);
      setUser(decodedUser);
      setUserRole(role);
      localStorage.setItem('authTokens', JSON.stringify(data));
      localStorage.setItem('userRole', role);

      // Step 4: Navigate based on the role found
      if (role === 'employee') {
        navigate('/employee-dashboard');
      } else {
        navigate('/customer-dashboard');
      }

    } catch (error) {
      console.error("Login process failed:", error);
      logoutUser(false); 
      throw error;
    }
  };

  const logoutUser = (shouldNavigate = true) => {
    setAuthTokens(null);
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('authTokens');
    localStorage.removeItem('userRole');
    if (shouldNavigate) {
      navigate('/');
    }
  };

  const contextData = { user, authTokens, userRole, loginUser, logoutUser };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
