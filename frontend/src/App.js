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
import AuthProvider from './contexts/AuthProvider'
import SocketProvider from './contexts/SocketProvider'
import store from './slices'
import Header from "./components/Header.jsx";



function App() {
  return (
    <AuthProvider>

      <StoreProvider store={store}>
        <SocketProvider>
          <Router>
            <div className="d-flex flex-column h-100">
              <Header />
              <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<Chats/>} />
                <Route path="*" element={<NotFound/>} />
              </Routes>
            </div>
          </Router>
        </SocketProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
