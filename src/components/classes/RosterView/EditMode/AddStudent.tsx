import { FC } from 'react'

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { createStudent } from '../../../../services/students';

interface Props {
  classId: string
}

const labelMapping = {
  firstName: 'First Name',
  lastInitial: 'Last Initial',
  parentEmail: 'Parent Email',
}

const AddStudent : FC<Props> = ({ classId }) => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastInitial: '',
      parentEmail: '',
    },
    validationSchema: Yup.object({
      firstName: Yup
        .string()
        .max(255)
        .required('First name is required'),
        lastInitial: Yup
        .string()
        .max(1, 'Must be one character')
        .required('Last initial is required'),
      parentEmail: Yup
        .string()
        .email('Email is invalid')
        .required('Email is required'),
    }),
    onSubmit: async () => {
      await createStudent(classId, {
        ...formik.values
      });
      formik.resetForm();
    },
    validateOnMount: true,
  });

  return (
    <Stack
        direction="row"
        spacing={2}
    >
      {
        Object.keys(formik.values).map(key => (
          <TextField
            fullWidth
            error={Boolean(formik.touched[key] && formik.errors[key])}
            helperText={formik.touched[key] && formik.errors[key]}
            key={key}
            label={labelMapping[key]}
            value={formik.values[key]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name={key}
          />
        ))
      }
      <Stack
        justifyContent='center'
      >
        <Button
            variant="contained"
            onClick={() => formik.handleSubmit()}
            disabled={!formik.isValid}
        >
            Add
        </Button>
      </Stack>
    </Stack>
  )
}

export default AddStudent