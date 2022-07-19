import {
  Navbar,
  Container,
  NavbarBrand, 
  Button,
  
} from 'react-bootstrap';
import {
  useNavigate,
  Link,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";

import AuthContext from '../contexts';
import useAuth from '../hooks';
import router from '../routes';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : <Button as={Link} to="/login">Войти</Button>
  );
};
const Header = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      auth.logIn();
    }
    if (!auth.loggedIn) {
      const { pages: {login}} = router;
      navigate(login);
      return;
    }
  }, []);

  return (
    <div className="d-flex flex-column h-100">
    <Navbar className='shadow-sm bg-white'>
     <Container>
      <NavbarBrand href='/'>Hexlet Chat</NavbarBrand>
     </Container>
     <AuthButton />
    </Navbar>
    <Container fluid className='h-100'>
    </Container>
  </div>

  );
}

export default Header;