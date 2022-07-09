import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const Login = (props) => {
  const initUser = {
    login: '',
    password: ''
  };
  const validationSchema = yup.object().shape({
    login: yup.string().required('required'),
    password: yup.string().required('required')
  });
  return (
    <Formik
    initialValues={initUser}
    validationSchema={validationSchema}
    onSubmit={values => {
      // same shape as initial values
      console.log(values);
    }}
    >
      {({ errors, touched }) => (
      <Form>
        <label htmlTo='login'>login</label>
        <Field name="login" />
        {errors.login && touched.login ? (
          <div>{errors.login}</div>
        ) : null}
        <label htmlTo='password'>password</label>
        <Field name="password" type="password" />
        {errors.password && touched.password ? <div>{errors.password}</div> : null}
        <button type="submit">Submit</button>
      </Form>
      )}
     </Formik>
  );
}

export default Login;
