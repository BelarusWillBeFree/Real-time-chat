import {
  Navbar,
  Container,
  NavbarBrand, 
  Button,
} from 'react-bootstrap';
import {
  Link,
} from "react-router-dom";
import React from "react";

import useAuth from '../hooks/useAuth';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : <Button as={Link} to="/login">Войти</Button>
  );
};
const Header = () => {

  return (
    <Navbar className='shadow-sm bg-white'>
     <Container>
      <NavbarBrand href='/'>Hexlet Chat</NavbarBrand>
     </Container>
     <AuthButton />
    </Navbar>
  );
}

export default Header;