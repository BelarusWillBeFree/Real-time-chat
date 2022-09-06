import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';

import { getToken } from '../api/dataExchange.js';
import { saveToken } from '../hooks/useLocalStor.js';
import useAuth from '../hooks/useAuth.jsx';
import router from '../routes';

const FormAuth = () => {
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('validation.requiredLogin'),
    password: yup
      .string()
      .required('validation.requiredPassword'),
  });
  const auth = useAuth();

  const navigate = useNavigate();
  const {
    pages: { home },
  } = router;
  const [errAuth, setErrAuth] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await getToken(values);
        saveToken(data);
        auth.logIn();
        navigate(home);
      } catch (error) {
        rollbar.error('error login', error);
        setErrAuth(true);
      }
    },
  });

  const { values, errors, touched } = formik;
  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('login.text')}</h1>
      <FloatingLabel
        label={t('login.username')}
        controlId="username"
        className="mb-3"
      >
        <Form.Control
          required
          name="username"
          autoComplete="username"
          placeholder={t('login.username')}
          value={values.username}
          ref={null}
          onChange={formik.handleChange}
          isInvalid={(t(errors.username) && touched.username) || errAuth}
        />
      </FloatingLabel>
      <FloatingLabel
        label={t('login.password')}
        controlId="password"
        htmlFor="username"
        className="mb-4"
        type="password"
      >
        <Form.Control
          required
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder={t('login.password')}
          value={values.password}
          onChange={formik.handleChange}
          isInvalid={(t(errors.password) && touched.password) || errAuth}
        />
      </FloatingLabel>
      {errAuth ? (
        <Form.Text className="text-danger">
          {t('errors.loginOrPassword')}
        </Form.Text>
      ) : null}
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">
        {t('buttons.input')}
      </Button>
    </Form>
  );
};

export default FormAuth;
