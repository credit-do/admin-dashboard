import { useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Box, Button, Container, Link, TextField, Typography, Stack } from '@mui/material';

import useAuth from '../hooks/useAuth';

const Login : NextPage = () => {

  const router = useRouter();

  const { auth, signIn } = useAuth();
  const [error, setError] = useState<string>();

  if(auth) {
    router.push('/');
  }

  const formik = useFormik({
    initialValues: {
      email: 'jason@hedmans.org',
      password: 'Letmein123!'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      signIn(formik.values.email, formik.values.password)
        .catch(error => {
          formik.setSubmitting(false);
          setError(error.message);
        });
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign In
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Stack
              py={2}
              spacing={1}
            >
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
              <Typography 
                textAlign='center' 
                color='error'
              >
                {error}
              </Typography>
            </Stack>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
