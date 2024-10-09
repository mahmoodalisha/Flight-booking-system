import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^[a-z][a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(4, 'Password must be at least 4 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:5000/api/customers/register', values);
        alert('User registered successfully');
      } catch (error) {
        alert('Error registering user');
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

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
