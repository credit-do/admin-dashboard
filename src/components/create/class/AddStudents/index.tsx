import { FC } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import AddStudent from './AddStudent'

import EditStudent from './EditStudent';

import { useStudentsFormik } from '../../../../hooks/useCreateClass';

import { StudentInput } from '../../../../services/students';
import { useWizard } from 'react-use-wizard';
import WizardFooter from '../WizardFooter';

interface Props {
    studentsValues: {students: StudentInput[]};
    saveStudentsData: (students: StudentInput[]) => void;
}

const AddStudents : FC<Props> = ({ saveStudentsData, studentsValues }) => {

    const { nextStep, previousStep } = useWizard(); 

    const studentsFormik = useStudentsFormik(studentsValues);

    const onNext = () => {
        saveStudentsData(studentsFormik.values.students);
        nextStep();
    }

    const onSkip = () => {
        nextStep();
    }
    
    return (
        <Stack
            spacing={2}
            alignItems='center'
        >
            <Typography
                variant="h4"
            >
                Add Students
            </Typography>
            {
                studentsFormik.values.students.length > 0 ? (
                    studentsFormik.values.students.map((student, index) => (
                        <EditStudent
                            key={index}
                            student={student}
                            handleBlur={studentsFormik.handleBlur}
                            handleChange={studentsFormik.handleChange}
                            error={studentsFormik.errors.students?.[index] as { [fieldName: string]: string }}
                            touched={studentsFormik.touched.students?.[index] as { [fieldName: string]: boolean }}
                            index={index}
                        />
                    ))
                ) : (
                    <Typography>
                        No students added yet.
                    </Typography>
                )
            }
            <AddStudent
                addStudent={() => {
                    studentsFormik.setFieldValue(`students`, studentsFormik.values.students.concat([{
                        firstName: '',
                        lastInitial: '',
                        parentEmail: '',
                    }]))
                }}
            />
            <WizardFooter 
                onPrevious={previousStep}
                onNext={onNext}
                onSkip={onSkip}
                isNextDisabled={!studentsFormik.isValid || studentsFormik.values.students.length === 0}
            />
        </Stack>
    )
}

export default AddStudents