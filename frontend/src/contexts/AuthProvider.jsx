import React, { useState, useMemo } from 'react';
import { AuthContext } from './Context.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('login');
    setLoggedIn(false);
  };
  // const foo = useMemo(() => ({ loggedIn, logIn, logOut }), []);
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
