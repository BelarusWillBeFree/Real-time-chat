//import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  Navbar,
  Container,
  NavbarBrand, 
  Button,
  
} from 'react-bootstrap';
import React, {useContext, useEffect, useState} from "react";


import Login from './components/Login.jsx';
import NotFound from './components/NotFound.jsx';
import Home from './components/Home.jsx';
import AuthContext from './contexts'

import Main from "./components/Header.jsx";

const AuthProvider = ({children}) => {
//  const isToken = localStorage.getItem('token');
//  const [isAuth, setAuth] = useState(isToken);

  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };  

  return (
    <AuthContext.Provider value={{loggedIn, logIn, logOut}}> 
      {children}
    </AuthContext.Provider>
  );
}

function App() {
//  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <AuthProvider>

      <Router>
        <Main />
          <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
