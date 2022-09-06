import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Chats from './pages/Chats.jsx';
import Signup from './pages/Signup.jsx';

import AuthProvider from './contexts/AuthProvider.jsx';
import SpinerProvider from './contexts/SpinerProvider.jsx';

import Header from './components/Header.jsx';

const App = () => (
  <AuthProvider>
    <SpinerProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Chats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </SpinerProvider>
  </AuthProvider>
);

export default App;
