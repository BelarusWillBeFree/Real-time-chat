import {
  Row, Col, Card, Image, Anchor,
} from 'react-bootstrap';
import React from 'react';
import { useTranslation } from 'react-i18next';

import helloImage from '../assets/img/index.jpeg';
import FormAuth from '../components/FormAuth.jsx';

const Login = () => {
  const { t } = useTranslation();

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
};

export default Login;
