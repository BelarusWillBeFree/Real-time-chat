import {
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';
import {
  useNavigate,
} from "react-router-dom";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from "react-redux";

import { localStorSet } from '../../hooks/useLocalStor';
import useAuth from '../../hooks/useAuth'
import router from '../../routes';
import { setUsername, setToken } from '../../slices/loginSlice';

const FormAuth = (props) => {
  const dispatch = useDispatch();
  const initialValues = {
    username: '',
    password: ''
  };
  const validationSchema = yup.object().shape({
    username: yup.string().required('Login обязательное поле'),
    password: yup.string().required('password обязательное поле')
  });
  const auth = useAuth();
  const navigate = useNavigate();
  const {pages: {home}} = router;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(values, props) => {
      
      try {
        const {username, token} = await localStorSet(values);
          dispatch(setUsername(username));
          dispatch(setToken(token));
        auth.logIn();
        navigate(home);
      } catch ({response}) {
          setErrAuth(true);
      }
    },
  });
  const [errAuth, setErrAuth] = useState(false);
  const { values, errors, touched } = formik;
  return (
    <Form validated={!errAuth} className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={formik.handleSubmit}>
    <h1 className='text-center mb-4'>
      Войти
    </h1>
    <FloatingLabel label='Ваш ник' controlId='username' className='mb-3'>
      <Form.Control 
        required
        name='username' 
        autoComplete='username' 
        placeholder='ваш ник'
        value={values.username}
        ref={null}
        onChange={formik.handleChange}
        isInvalid={(errors.username && touched.username)||errAuth}
      />
    </FloatingLabel>
    <FloatingLabel label='Пароль' controlId='password' className='mb-4' type='password'>
      <Form.Control 
        required
        name='password' 
        type='password'
        autoComplete='current-password' 
        placeholder='Пароль'
        value={values.password}
        onChange={formik.handleChange}
        isInvalid={(errors.password && touched.password)||errAuth}
      />
    </FloatingLabel>
    {errAuth?<Form.Text className='text-danger'>Неверные имя пользователя или пароль</Form.Text> : null}
    <Button type='submit' variant='outline-primary' className='w-100 mb-3'>
      Войти
    </Button>
  </Form>
  );
}

export default FormAuth;