import { FC } from 'react'

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import { colWidths } from '../../types'

import StudentDisplay from './StudentDisplay'
import LessonProgress from './LessonProgress'
import HoursDisplay from './LessonProgress/HoursDisplay'
import EventsDisplay from './LessonProgress/EventsDisplay'

import { Student } from '../../../../../hooks/types'
import ScoreCircle from './LessonProgress/ScoreCircle'

interface Props {
    student: Student;
    classId: string;
}

const StudentRow : FC<Props> = ({ student, classId }) => {

    const views = [
        <StudentDisplay 
            key='student'
            firstName={student.firstName}
            lastInitial={student.lastInitial}
            profilePicture={student.profilePicture}
        />,
        <LessonProgress 
            key='lessonProgress'
            classId={classId}
        />,
        <HoursDisplay 
            key='hours'
            hours={10}
        />,
        <EventsDisplay 
            key='student'
            numCompleted={2}
        />,
        <ScoreCircle 
            key='pre-test'
            color='error'
            score={50}
        />,
        <ScoreCircle 
            key='student'
            color='success'
            score={98}
        />,
    ]

    return (
        <Grid
            py={2}
            container
            spacing={1}
        >
            {colWidths.map((width, index) => (
                <Grid
                    key={index}
                    item
                    xs={width}
                >
                    <Stack
                        height='100%'
                        justifyContent='center'
                        alignItems='center'
                    >
                        {views[index]}
                    </Stack>
                </Grid>
            ))}
        </Grid>
    )
}

export default StudentRow