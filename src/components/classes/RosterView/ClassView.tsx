import { useState, FC } from 'react'

import Stack from '@mui/material/Stack';

import ClassHeader from './ClassHeader'

import { Class } from '../../../hooks/types';
import useStudents from '../../../hooks/useStudents';
import ViewMode from './ViewMode';
import EditMode from './EditMode';

interface Props {
    classData: Class
}

const ClassView : FC<Props> = ({ classData }) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const { students } = useStudents(classData.id);
    console.log(students);
    return (
        <Stack
            spacing={2}
        >
            <ClassHeader
                classData={classData}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
            />
            {
                isOpen && (
                    isEditMode ? (
                        <EditMode 
                            classId={classData.id}
                            students={students}
                        />
                    ) : (
                        <ViewMode 
                            students={students}
                            classId={classData.id}
                        />
                    )
                )
            }
        </Stack>
    )
}

export default ClassView