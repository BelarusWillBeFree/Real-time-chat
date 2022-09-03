import {
  Row, Col, Card, Image, Anchor,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import helloImage from '../assets/img/index.jpeg';

import FormAuth from '../components/FormAuth.jsx';

import router from '../routes';

import useAuth from '../hooks/useAuth.jsx';

const Login = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const {
    pages: { home },
  } = router;

  useEffect(() => {
    if (auth.loggedIn) {
      navigate(home);
    }
  }, []);

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12" md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col md={6} className="col-12 d-flex align-items-center justify-content-center">
              <Image src={helloImage} className="rounded-circle" alt="login" />
            </Col>
            <FormAuth />
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span className="px-1">{t('login.noAccount')}</span>
              <Anchor href="/signup">{t('login.signup')}</Anchor>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
