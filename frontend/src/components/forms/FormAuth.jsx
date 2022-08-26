import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

import { localStorSet } from '../../hooks/useLocalStor.jsx';
import useAuth from '../../hooks/useAuth.jsx';
import router from '../../routes';
import { setUsername, setToken } from '../../slices/loginSlice';

const FormAuth = () => {
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const initialValues = {
    username: '',
    password: ''
  };
  const validationSchema = yup.object().shape({
    username: yup.string().required(t('validation.required', { name: 'Login' })),
    password: yup.string().required(t('validation.required', { name: 'password' }))
  });
  const auth = useAuth();

  const navigate = useNavigate();
  const {
    pages: { home }
  } = router;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, props) => {
      try {
        const { username, token } = await localStorSet(values);
        dispatch(setUsername(username));
        dispatch(setToken(token));
        auth.logIn();
        navigate(home);
      } catch (error) {
        rollbar.error('error login', error);
        setErrAuth(true);
      }
    }
  });
  const [errAuth, setErrAuth] = useState(false);
  const { values, errors, touched } = formik;
  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('login.text')}</h1>
      <FloatingLabel label={t('login.username')} controlId="username" className="mb-3">
        <Form.Control
          required
          name="username"
          autoComplete="username"
          placeholder={t('login.username')}
          value={values.username}
          ref={null}
          onChange={formik.handleChange}
          isInvalid={(errors.username && touched.username) | errAuth}
        />
      </FloatingLabel>
      <FloatingLabel
        label={t('login.password')}
        controlId="password"
        htmlFor="username"
        className="mb-4"
        type="password">
        <Form.Control
          required
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder={t('login.password')}
          value={values.password}
          onChange={formik.handleChange}
          isInvalid={(errors.password && touched.password) || errAuth}
        />
      </FloatingLabel>
      {errAuth ? (
        <Form.Text className="text-danger">{t('errors.loginOrPassword')}</Form.Text>
      ) : null}
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('buttons.input')}
      </Button>
    </Form>
  );
};

export default FormAuth;
