import { useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
  Avatar,
  MenuItem
} from '@mui/material';

import useAuth from '../../hooks/useAuth';
import { userDataKeys } from '../../hooks/types';

var pick = require('lodash.pick');

const prefixes = ['Mr.', 'Mrs.', 'Ms.', 'Dr.'];


const RegisterTeacher : NextPage = () => {
  const router = useRouter();

  const { user, signUp } = useAuth();
  const [error, setError] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false,
      profilePicture: '',
      prefix: '',
      school: '',
      district: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Last name is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      prefix: Yup
        .string()
        .max(255)
        .required(
          'Prefix is required'),
      school: Yup
        .string()
        .max(255)
        .required(
          'School is required'),
      district: Yup
        .string()
        .max(255)
        .required(
          'District is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        ),
      profilePicture: Yup
        .string()
        .max(255)
        .required(
          'Profile picture is required'),
    }),
    onSubmit: async () => {
      signUp(formik.values.email, formik.values.password, pick(formik.values, userDataKeys))
        .catch(error => {
          formik.setSubmitting(false);
          setError(error.message);
        });
    }
  });

  if(user) {
    router.push('/');
  }

  const randomizeAvatar = () => {
    formik.setFieldValue(
      'profilePicture', 
      `https://api.multiavatar.com/${Math.random().toString(8).substring(2)}.png`
    );
  }

  return (
    <>
      <Head>
        <title>
          Register
        </title>
      </Head>
      <Box
        component="main"
        py={4}
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container
          maxWidth="sm"
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack
              alignItems='center'
              spacing={2}
            >
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a New Account
              </Typography>
              <Stack
                alignItems='center'
                spacing={0}
              >
                <Avatar
                  alt='Profile picture'
                  src={formik.values.profilePicture}
                  sx={{
                    height: 64,
                    width: 64
                  }}
                />
                <Button
                  color='primary'
                  onClick={randomizeAvatar}
                  variant='text'
                >
                  Randomize
                </Button>
                {
                  formik.errors.profilePicture && (
                    <Typography
                      variant='caption'
                      color="error"
                    >
                      {formik.errors.profilePicture}
                    </Typography>
                  )
                }
              </Stack>
              <TextField
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.prefix && formik.errors.prefix)}
                fullWidth
                helperText={formik.touched.prefix && formik.errors.prefix}
                select
                label="Prefix"
                name="prefix"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.prefix}
                variant="outlined"
              >
                {prefixes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
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
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              <Stack
                direction='row'
                spacing={2}
              >
                <TextField
                  error={Boolean(formik.touched.school && formik.errors.school)}
                  helperText={formik.touched.school && formik.errors.school}
                  fullWidth
                  label="School"
                  name="school"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="school"
                  value={formik.values.school}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.district && formik.errors.district)}
                  helperText={formik.touched.district && formik.errors.district}
                  fullWidth
                  label="District"
                  name="district"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="district"
                  value={formik.values.district}
                  variant="outlined"
                />
              </Stack>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Checkbox
                  checked={formik.values.policy}
                  name="policy"
                  onChange={formik.handleChange}
                />
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  I have read the
                  {' '}
                  <NextLink
                    href="#"
                    passHref
                  >
                    <Link
                      color="primary"
                      underline="always"
                      variant="subtitle2"
                    >
                      Terms and Conditions
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>
                  {formik.errors.policy}
                </FormHelperText>
              )}
            </Stack>
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
                Sign Up
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
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default RegisterTeacher;
