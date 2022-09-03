import {
  Navbar, Container, NavbarBrand, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth.jsx';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return auth.loggedIn ? (
    <Button onClick={auth.logOut}>{t('buttons.output')}</Button>
  ) : (
    <Button as={Link} to="/login">
      {t('buttons.input')}
    </Button>
  );
}

const Header = () => {
  return (
    <Navbar className="shadow-sm bg-white">
      <Container>
        <NavbarBrand href="/">Hexlet Chat</NavbarBrand>
      </Container>
      <AuthButton />
    </Navbar>
  );
}

export default Header;
