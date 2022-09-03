import React, { useState } from 'react';
import { AuthContext } from './Context.jsx';
import { removeItem, getLogin } from '../hooks/useLocalStor.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(getLogin()!==null);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    removeItem('login');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
