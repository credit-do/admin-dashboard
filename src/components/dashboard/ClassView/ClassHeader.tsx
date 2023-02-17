import React from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import moment from 'moment';

import { Class } from '../../../hooks/types';

interface Props {
    classData: Class;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ClassHeader : React.FC<Props> = ({ classData, isOpen, setIsOpen }) => {
  return (
    <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
    >
        <Typography
            variant="h6"
            fontWeight='bold'
            sx={{
                color: isOpen ? 'secondary.main' : '#7d828a',
            }}
        >
            {classData.name} ({moment(classData.time.seconds * 1000).format('h:mm a')})
        </Typography>
        <IconButton 
            color="secondary"
            onClick={() => setIsOpen(!isOpen)} 
        >
            {
                isOpen 
                    ? (
                        <KeyboardArrowUpIcon 
                            color='secondary'
                        /> 
                    ) : (
                        <KeyboardArrowDownIcon 
                            sx={{
                                color: '#9CA3AF',
                            }}
                        />
                    )
            }
        </IconButton>
    </Stack>
  )
}

export default ClassHeader