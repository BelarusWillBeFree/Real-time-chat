import {
  Row, Form, FormControl, Col, Card, Image, Button, FloatingLabel, Anchor,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import router from '../routes';
import singupImage from '../assets/img/signup.jpeg';
import signupApi from '../api/signupApi.js';
import useAuth from '../hooks/useAuth.jsx';
import { saveToken } from '../hooks/useLocalStor.js';

const submitForm = (props) => {
  const {
    valuesForSend, setErrorServValid, navigate, errors, auth, t,
  } = props;
  const dataForSubmit = {
    username: valuesForSend.username,
    password: valuesForSend.password,
  };
  const {
    pages: { home },
  } = router;
  signupApi(dataForSubmit)
    .then((response) => {
      setErrorServValid(false);
      saveToken(response.data);
      auth.logIn();
      navigate(home);
    })
    .catch(({ response }) => {
      setErrorServValid(true);
      if (response.status === 409) {
        errors.confirmPassword = t('errors.userAlredyExist');
      }
    });
};

const Signup = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const auth = useAuth();

  const { t } = useTranslation();
  useEffect(() => {
    inputRef.current.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [errServValid, setErrorServValid] = useState(false);
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('validation.requiredName')
      .min(2, 'validation.sizeFrom3To20')
      .max(20, 'validation.sizeFrom3To20'),
    password: yup
      .string()
      .required('validation.requiredPassword')
      .min(5, 'validation.minSym6'),
    confirmPassword: yup.string().when('password', {
      is: (val) => !!(val && val.length > 0),
      then: yup.string().oneOf([yup.ref('password')], 'validation.confirmPassword'),
    }),
  });

  const {
    values, errors, touched, handleChange, handleBlur, handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (valuesForSend) => {
      const propsSubmit = {
        valuesForSend,
        setErrorServValid,
        navigate,
        errors,
        auth,
        t,
      };
      submitForm(propsSubmit);
    },
  });

  return (
    <Row className="justify-content-center align-content-center h-100">
      <Col className="col-12" md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
            <Col md={6} className="col-12 d-flex align-items-center justify-content-center">
              <Image src={singupImage} className="rounded-circle" alt="singup" />
            </Col>
            <Form className="w-50" onSubmit={handleSubmit}>
              <h1 className="text-center mb-4">{t('singup.text')}</h1>
              <FloatingLabel label={t('singup.username')} controlId="username" className="mb-3">
                <Form.Control
                  name="username"
                  autoComplete="username"
                  placeholder={t('singup.username')}
                  ref={inputRef}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={(touched.username && errors.username) || errServValid}
                />

                <FormControl.Feedback type="invalid" tooltip>
                  {t(errors.username)}
                </FormControl.Feedback>
              </FloatingLabel>
              <FloatingLabel label={t('singup.password')} controlId="password" className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  autoComplete="password"
                  placeholder={t('singup.password')}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={(touched.password && errors.password) || errServValid}
                />

                <FormControl.Feedback type="invalid" tooltip>
                  {t(errors.password)}
                </FormControl.Feedback>
              </FloatingLabel>
              <FloatingLabel
                label={t('singup.confirmPassword')}
                controlId="confirmPassword"
                className="mb-3"
              >
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirmPassword"
                  placeholder={t('singup.confirmPassword')}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={(touched.confirmPassword && errors.confirmPassword) || errServValid}
                />

                <FormControl.Feedback type="invalid" tooltip>
                  {t(errors.confirmPassword)}
                </FormControl.Feedback>
              </FloatingLabel>
              <Button variant="outline-primary w-100" type="submit">
                {t('buttons.signup')}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span className="px-1">{t('singup.toPage')}</span>
              <Anchor href="/login">{t('singup.login')}</Anchor>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
