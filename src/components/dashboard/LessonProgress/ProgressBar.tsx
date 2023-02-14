import { useState, FC } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import StatusBadge from './StatusBadge'
import ProgressStep from './ProgressStep'

import type { Status } from './types'
import { Lesson } from '../../../hooks/types'
import { getLessonStatus } from '../../../services/utils'

interface Step {
    status: Status;
    title: string;
}

interface Props {
    lessons: Lesson[];
}

const ProgressBar : FC<Props> = ({ lessons }) => {
    const steps : Step[] = lessons.map(lesson => ({
        status: getLessonStatus(lesson),
        title: lesson.title,
    }))

    const [selectedStep, setSelectedStep] = useState<number>(0);

    return (
        <Stack spacing={2}>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Typography
                    variant="h6"
                >
                    {steps[selectedStep].title}
                </Typography>
                <StatusBadge 
                    status={steps[selectedStep].status} 
                />
            </Stack>
            <Stack
                direction="row"
                spacing={0.5}
            >
                {
                    steps.map((step, index) => (
                        <ProgressStep 
                            key={index}
                            isFirst={index === 0}
                            isLast={index === steps.length - 1}
                            status={step.status}
                            selected={index === selectedStep}
                            onClick={() => setSelectedStep(index)}
                        />
                    ))
                }
            </Stack>
        </Stack>
    )
}

export default ProgressBar