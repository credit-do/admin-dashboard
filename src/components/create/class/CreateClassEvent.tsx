import React from 'react'

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useCreateEvent } from '../../../hooks/useCreateClass';
import { useWizard } from 'react-use-wizard';
import WizardFooter from './WizardFooter';
import { EventInput } from '../../../services/events';

interface Props {
    eventValues: EventInput;
    saveEventData: (eventData: EventInput) => void
}

const CreateClassEvent : React.FC<Props> = ({ saveEventData, eventValues }) => {

    const { nextStep, previousStep } = useWizard();

    const eventFormik = useCreateEvent(eventValues);

    const onNext = () => {
        nextStep();
        saveEventData(eventFormik.values);
    }

    const onSkip = () => {
        nextStep();
    }

    return (
        <Stack
            alignItems='center'
            spacing={2}
            width='100%'
        >
            <Typography
                color="textPrimary"
                variant="h4"
            >
                Create an Event
            </Typography>
            <TextField
                error={Boolean(eventFormik.touched.title && eventFormik.errors.title)}
                fullWidth
                helperText={eventFormik.touched.title && eventFormik.errors.title}
                label="Event Title"
                name="title"
                onBlur={eventFormik.handleBlur}
                onChange={eventFormik.handleChange}
                value={eventFormik.values.title}
                variant="outlined"
            />
            <LocalizationProvider 
                dateAdapter={AdapterDateFns}
            >
                <DateTimePicker
                    label="Start Date"
                    value={eventFormik.values.startDate}
                    onChange={(val) => {
                        eventFormik.setFieldValue('startDate', val);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="startDate"
                            onBlur={eventFormik.handleBlur}
                            fullWidth
                            error={Boolean(eventFormik.touched.startDate && eventFormik.errors.startDate)}
                        />
                    )}
                />
                <DateTimePicker
                    label="End Date"
                    value={eventFormik.values.endDate}
                    onChange={(val) => {
                        eventFormik.setFieldValue('endDate', val);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="endDate"
                            fullWidth
                            error={Boolean(eventFormik.touched.endDate && eventFormik.errors.endDate)}
                            onBlur={eventFormik.handleBlur}
                        />
                    )}
                />
            </LocalizationProvider>
            <FormControlLabel 
                control={
                    <Switch
                        checked={eventFormik.values.isVirtual}
                        onChange={(e) => {
                            eventFormik.setFieldValue('isVirtual', e.target.checked);
                            if(e.target.checked) {
                                eventFormik.setFieldValue('address', 'Virtual');
                            } else {
                                eventFormik.setFieldValue('address', '');
                            }
                        }} 
                    />
                } 
                label={eventFormik.values.isVirtual ? 'Virtual' : 'In-Person'}
            />
            <TextField
                error={Boolean(eventFormik.touched.address && eventFormik.errors.address)}
                fullWidth
                helperText={eventFormik.touched.address && eventFormik.errors.address}
                label="Event Address"
                name="address"
                onBlur={eventFormik.handleBlur}
                onChange={eventFormik.handleChange}
                value={eventFormik.values.address}
                variant="outlined"
                disabled={eventFormik.values.isVirtual}
            />
            <WizardFooter 
                onPrevious={previousStep}
                onNext={onNext}
                onSkip={onSkip}
                isNextDisabled={!eventFormik.isValid}
            />
        </Stack>
    )
}

export default CreateClassEvent