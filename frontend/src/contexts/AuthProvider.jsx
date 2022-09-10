import React, { useState } from 'react';

import { AuthContext } from './Context.jsx';

const AuthProvider = ({ children }) => {
  const NAME_KEY = 'login';
  const getLogin = () => {
    const data = localStorage.getItem(NAME_KEY);
    return data === null ? null : JSON.parse(data);
  };

  const [loggedIn, setLoggedIn] = useState(getLogin() !== null);

  const saveToken = async (data) => {
    localStorage.setItem(NAME_KEY, JSON.stringify(data));
    setLoggedIn(true);
  };
    
  const removeItem = () => {
    localStorage.removeItem(NAME_KEY);
  };

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    removeItem();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, saveToken, getLogin }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
