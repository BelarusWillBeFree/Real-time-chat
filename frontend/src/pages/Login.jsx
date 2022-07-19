import {
  Row,
  Col,
  Card,
  Image,
  Anchor
} from 'react-bootstrap'; 
import {
  useNavigate,
} from "react-router-dom";
import { useEffect, useContext } from 'react';

import helloImage from '../assets/img/index.jpeg';
import FormAuth from "../components/FormAuth";
import router from '../routes';
import AuthContext from '../contexts';

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {pages: {home}} = router;

  useEffect(() => {
    if (auth.loggedIn) {
      navigate(home);
    }
  }, []);
  
  return (
    <Row className='justify-content-center align-content-center h-100'>
      <Col className='col-12' md={8} xxl={6}>
        <Card className='shadow-sm'>
          <Card.Body className='row p-5'>
            <Col md={6} className='col-12 d-flex align-items-center justify-content-center'>
              <Image src={helloImage} className='rounded-circle' alt='login'></Image>
            </Col>
            <FormAuth />

          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span className="px-1">Нет аккаунта?</span>
              <Anchor href="/signup">Регистрация ›</Anchor>
            </div>
          </Card.Footer>
      </Card>
      </Col>
     </Row>
  );
}

export default Login;
