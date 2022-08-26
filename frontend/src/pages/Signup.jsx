import {
  Row, Form, FormControl, Col, Card, Image, Button, FloatingLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import router from '../routes';

import singupImage from '../assets/img/signup.jpeg';

import signupApi from '../api/signupApi.js';

import { setUsername, setToken } from '../slices/loginSlice';

import useAuth from '../hooks/useAuth.jsx';

const submitForm = (props) => {
  const {
    values, setErrorServValid, dispatch, navigate, errors, auth, t,
  } = props;
  const dataForSubmit = {
    username: values.username,
    password: values.password,
  };
  const {
    pages: { home },
  } = router;
  signupApi(dataForSubmit)
    .then((response) => {
      const { username, token } = response.data;
      setErrorServValid(false);
      localStorage.setItem('login', JSON.stringify(response.data));
      dispatch(setUsername(username));
      dispatch(setToken(token));
      auth.logIn();
      navigate(home);
    })
    .catch(({ response }) => {
      if (response.status === 409) {
        setErrorServValid(true);
        errors.confirmPassword = t('errors.userAlredyExist');
      }
    });
};

function Signup() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();

  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
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
      .required(t('validation.required', { name: 'Имя пользователя' }))
      .min(2, t('validation.sizeFromTo', { from: 3, to: 20 }))
      .max(20, t('validation.sizeFromTo', { from: 3, to: 20 })),
    password: yup
      .string()
      .required(t('validation.required', { name: 'password' }))
      .min(5, t('validation.minSym', { min: 6 })),
    confirmPassword: yup.string().when('password', {
      is: (val) => !!(val && val.length > 0),
      then: yup.string().oneOf([yup.ref('password')], t('validation.confirmPassword')),
    }),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const propsSubmit = {
        values,
        setErrorServValid,
        dispatch,
        navigate,
        errors,
        auth,
        t,
      };
      submitForm(propsSubmit);
    },
  });
  const {
    values, errors, touched, handleChange, handleBlur, handleSubmit,
  } = formik;
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
                  {errors.username}
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
                  {errors.password}
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
                  {errors.confirmPassword}
                </FormControl.Feedback>
              </FloatingLabel>
              <Button variant="outline-primary w-100" type="submit">
                {t('buttons.signup')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Signup;
