import {
  BrowserRouter as Router, Routes, Route, Navigate
} from 'react-router-dom';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivatePage from './pages/PrivatePage.jsx';
import Signup from './pages/Signup.jsx';

import AuthProvider from './contexts/AuthProvider.jsx';
import SpinerProvider from './contexts/SpinerProvider.jsx';
import router from './routes';
import Header from './components/Header.jsx';
import useAuth from './hooks/useAuth.jsx';

const {
  pages: {
    home, signup, login, notFound
  },
} = router;

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return (
    auth.loggedIn ? children : <Navigate to={login} />
  );
};

const App = () => (
  <AuthProvider>
    <SpinerProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Header />
          <Routes>
            <Route path={login} element={<Login />} />
            <Route path={signup} element={<Signup />} />
            <Route path={notFound} element={<NotFound />} />
            <Route
              path={home}
              element={(
                <PrivateRoute>
                  <PrivatePage />
                </PrivateRoute>
              )}
            />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </SpinerProvider>
  </AuthProvider>
);

export default App;
