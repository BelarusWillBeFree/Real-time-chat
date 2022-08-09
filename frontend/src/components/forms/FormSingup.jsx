import {
  Row,
  Form,
  FormControl,
  Col,
  Card,
  Image,
  Button,
  FloatingLabel
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import router from '../routes';

import singupImage from '../assets/img/signup.jpeg';

import signupApi from '../api/signupApi.js'

import { useDispatch } from "react-redux";
import { setUsername, setToken } from '../slices/loginSlice';
import useAuth from '../hooks/useAuth'

const FormSignup = (props) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pages: {home}} = router;
  const auth = useAuth();
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
              .required('Имя пользователя обязательное поле')
              .min(2, 'От 3 до 20 символов')
              .max(20, 'От 3 до 20 символов'),
    password: yup
              .string()
              .required('password обязательное поле')
              .min(5, ' Не менее 6-ти символов'),
    confirmPassword: yup
              .string()
              .when('password', {
                is: val => (val && val.length > 0 ? true : false),
                then: yup.string().oneOf(
                  [yup.ref('password')],
                  'Пароли должны совпадать'
                )
              })
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, props) => {
      const dataForSubmit = {
        username: values.username,
        password: values.password,
      };
      signupApi(dataForSubmit)
      .then((response) => {
        const {username, token} = response.data;
        setErrorServValid(false);
        localStorage.setItem('login', JSON.stringify(response.data));
        dispatch(setUsername(username));
        dispatch(setToken(token));
        auth.logIn();
        navigate(home);
      }).catch(({response})=>{
        if (response.status === 409) {
          setErrorServValid(true);
          errors.confirmPassword='Такой пользователь уже существует'
        }
      });
    }

  });
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;
  return (
    <Form className='w-50' onSubmit={handleSubmit}>
      <h1 className='text-center mb-4'>
        Регистрация
      </h1>
      <FloatingLabel label='Имя пользователя' controlId='username' className='mb-3'>
        <Form.Control
          name='username'
          autoComplete='username'
          placeholder='Имя пользователя'
          ref={inputRef}
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={(touched.username && errors.username)||errServValid}
        />

        <FormControl.Feedback type='invalid' tooltip>{ errors.username }</FormControl.Feedback>
      </FloatingLabel>
      <FloatingLabel label='Пароль' controlId='password' className='mb-3'>
        <Form.Control
          name='password'
          type='password'
          autoComplete='password'
          placeholder='Пароль'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={(touched.password && errors.password)||errServValid}
        />

        <FormControl.Feedback type='invalid' tooltip>{ errors.password }</FormControl.Feedback>
      </FloatingLabel>              
      <FloatingLabel label='Подтвердите пароль' controlId='confirmPassword' className='mb-3'>
        <Form.Control
          name='confirmPassword'
          type='password'
          autoComplete='confirmPassword'
          placeholder='Подтвердите пароль'
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={(touched.confirmPassword && errors.confirmPassword)||errServValid}
        />

        <FormControl.Feedback type='invalid' tooltip>{ errors.confirmPassword }</FormControl.Feedback>
      </FloatingLabel> 
      <Button variant='outline-primary w-100' type='submit'>Зарегистрироваться</Button>
    </Form>
  );
}

export default FormSignup;
