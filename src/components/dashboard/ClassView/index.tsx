import {useState, FC} from 'react'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import ClassHeader from './ClassHeader'
import UpcomingEvent from '../UpcomingEvent';
import LessonProgress from '../LessonProgress';
import ImplementationProgress from '../ImplementationProgress';

import { Class } from '../../../hooks/types';

interface Props {
    classData: Class;
}

const ClassView : FC<Props> = ({ classData }) => {

    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <Stack
            spacing={1}
        >
            <ClassHeader
                classData={classData}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <Box
                display='grid'
                gridTemplateColumns={`${isOpen ? '1' : '2'}fr 1fr`}
                width='100%'
                gap={isOpen ? 4 : 2}
            >
                <Stack
                    direction={isOpen ? 'column' : 'row'}
                    spacing={isOpen ? 4 : 2}
                    flexGrow={isOpen ? 1 : 2}
                    // sx={{
                    //     gridColumnStart: '1',
                    //     gridColumnEnd: '2',
                    // }}
                >
                    <UpcomingEvent
                        compact={!isOpen}
                        classId={classData.id}
                    />
                    <LessonProgress
                        compact={!isOpen}
                        classId={classData.id}
                    />
                </Stack>
                <Stack
                    spacing={2}
                    flexGrow={1}
                >
                    <ImplementationProgress
                        compact={!isOpen}
                        classId={classData.id}
                    />
                </Stack>
            </Box>
        </Stack>
    )
}

export default ClassView