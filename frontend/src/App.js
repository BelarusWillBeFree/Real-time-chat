import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import React, { useState} from "react";
import { Provider as StoreProvider } from "react-redux";

import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Chats from './pages/Chats.jsx';
import AuthContext from './contexts'
import store from './slices'
import Header from "./components/Header.jsx";

const AuthProvider = ({children}) => {
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
  return (
    <AuthProvider>

      <StoreProvider store={store}>
        <Router>
          <Header />
            <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Chats/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
