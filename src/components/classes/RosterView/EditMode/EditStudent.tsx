import { FC } from 'react'

import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import { useFormik } from 'formik';
import * as Yup from 'yup';

const labelMapping = {
    firstName: 'First Name',
    lastName: 'Last Name',
    parentEmail: 'Parent Email',
}
  

import { Student } from '../../../../hooks/types'
import { updateStudent } from '../../../../services/students';

interface Props {
    student: Student;
    classId: string;
}

const EditStudent : FC<Props> = ({ student, classId }) => {

    const formik = useFormik({
        initialValues: {
            firstName: student.firstName,
            lastInitial: student.lastInitial,
            parentEmail: student.parentEmail,
            classId: classId,
            completedLessons: student.completedLessons,
            joinPermission: student.joinPermission,
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('First name is required'),
            lastInitial: Yup.string()
                .required('Last initial is required')
                .max(1, 'Must be one character'),
            parentEmail: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
        }),
        onSubmit: async () => {
            await updateStudent(classId, student.id, formik.values);
        }
    })

  return (
    <Stack
        direction="row"
        alignItems='center'
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
      <Button
        variant='contained'
        onClick={() => formik.handleSubmit()}
      >
        Save
      </Button>
    </Stack>
  )
}

export default EditStudent