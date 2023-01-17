import { useState, FC } from 'react'

import Link from 'next/link';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { createEvent } from '../../../services/events';

interface Props {
    classId: string;
}

const CreateEventComponent : FC<Props> = ({ classId }) => {

    const [submitted, setSubmitted] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            startDate: null,
            endDate: null,
            address: '',
            isVirtual: false,
        },
        validationSchema: Yup.object({
            title: Yup
                .string()
                .max(255)
                .required(
                    'Title is required'),
            startDate: Yup
                .date()
                .nullable()
                .required(
                    'Start date is required'),
            endDate: Yup
                .date()
                .nullable()
                .required(
                    'End date is required')
                .min(Yup.ref('startDate'), 'End date must be after start date'),
            address: Yup
                .string()
                .max(255)
                .required(
                    'Address is required'),
            isVirtual: Yup
                .boolean()
        }),
        onSubmit: async () => {
            await createEvent(classId, formik.values);
            setSubmitted(true);
        }
    });

    if(submitted) {
        return (
            <Stack
                alignItems='center'
                spacing={2}
            >
                <Typography variant='h5'>
                    Event Created!
                </Typography>
                <Link
                    href='/work'
                    passHref
                >
                    <Button
                        variant='contained'
                        color='primary'
                    >
                        Go to Events
                    </Button>
                </Link>
            </Stack>
        )
    }
    return (
        <TextField>hello</TextField>
    )
/*
    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack
                alignItems='center'
                spacing={4}
            >
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    Create an Event
                </Typography>
                <Stack 
                    spacing={2}
                    alignItems='center'
                >
                    <TextField
                        error={Boolean(formik.touched.title && formik.errors.title)}
                        fullWidth
                        helperText={formik.touched.title && formik.errors.title}
                        label="Event Title"
                        name="title"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        variant="outlined"
                    />
                    <LocalizationProvider 
                        dateAdapter={AdapterDateFns}
                    >
                        <DateTimePicker
                            label="Start Date"
                            value={formik.values.startDate}
                            onChange={(val) => {
                                formik.setFieldValue('startDate', val);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="startDate"
                                    onBlur={formik.handleBlur}
                                    error={Boolean(formik.touched.startDate && formik.errors.startDate)}
                                    helperText={formik.touched.startDate && formik.errors.startDate}
                                />
                            )}
                        />
                        <DateTimePicker
                            label="End Date"
                            value={formik.values.endDate}
                            onChange={(val) => {
                                formik.setFieldValue('endDate', val);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="endDate"
                                    error={Boolean(formik.touched.endDate && formik.errors.endDate)}
                                    helperText={formik.touched.endDate && formik.errors.endDate}
                                    onBlur={formik.handleBlur}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <FormControlLabel 
                        control={
                            <Switch
                                checked={formik.values.isVirtual}
                                onChange={(e) => {
                                    formik.setFieldValue('isVirtual', e.target.checked);
                                    if(e.target.checked) {
                                        formik.setFieldValue('address', 'Virtual');
                                    } else {
                                        formik.setFieldValue('address', '');
                                    }
                                }} 
                            />
                        } 
                        label={formik.values.isVirtual ? 'Virtual' : 'In-Person'}
                    />
                    <TextField
                        error={Boolean(formik.touched.address && formik.errors.address)}
                        fullWidth
                        helperText={formik.touched.address && formik.errors.address}
                        label="Event Address"
                        name="address"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        variant="outlined"
                        disabled={formik.values.isVirtual}
                    />
                </Stack>
                <Button
                    color="primary"
                    disabled={Boolean(Object.keys(formik.errors).length) || formik.isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Create Event
                </Button>
            </Stack>
        </form>
    )*/
}

export default CreateEventComponent