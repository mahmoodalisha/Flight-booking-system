import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../AuthContext'; 

const Login = () => {
  const { login, loading } = useAuth(); 

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '', 
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'), 
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await login(values.username, values.password); 
        alert('Logged in successfully');
      } catch (error) {
        alert('Error logging in');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div style={{ color: 'red' }}>{formik.errors.username}</div>
        ) : null}
      </div>

      <div>
        <input
          name="email" 
          type="email" 
          placeholder="Email"
          value={formik.values.email} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? ( 
          <div style={{ color: 'red' }}>{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
