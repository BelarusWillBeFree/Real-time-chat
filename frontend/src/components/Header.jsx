import {
  Navbar, Container, NavbarBrand, Button,
} from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.jsx';
import { useNavigate, Link } from 'react-router-dom';
import router from '../routes';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    pages: { login },
  } = router;
  const handleLogOut = () => {
    auth.logOut();
    navigate(login);
  };

  return auth.loggedIn ? (
    <Button onClick={handleLogOut}>{t('buttons.output')}</Button>
  ) : (
    <Button as={Link} to="/login">
      {t('buttons.input')}
    </Button>
  );
};

const Header = () => {
  return (
    <Navbar className="shadow-sm bg-white">
      <Container>
        <NavbarBrand href="/">Hexlet Chat</NavbarBrand>
      </Container>
      <AuthButton />
    </Navbar>
  );
};

export default Header;
