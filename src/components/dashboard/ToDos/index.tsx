import { FC } from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import ToDo from '../../utility/ToDo'

import { ToDo as ToDoType } from '../../../hooks/types'
import { Box } from '@mui/system'

type ToDoList = {
    'Not Started': ToDoType[];
    'Completed': ToDoType[];
}
interface Props {
    toDos: ToDoList;
    check: (id: string) => void;
    uncheck: (id: string) => void;
}

const ToDos : FC<Props> = ({ toDos, check, uncheck }) => {

    const activeBucket = toDos['Not Started'];
    console.log(toDos)
    console.log(activeBucket)
    toDos['Completed'].forEach((toDo) => {
        activeBucket.push(toDo);
    });

  return (
    <Stack 
        flex={1}
        spacing={1}
    >
        {/* <Typography
            variant="h6"
        >
            {activeBucket}
        </Typography> */}
        {/* <Divider /> */}
        <Box
            sx={{
                maxHeight: '50vh',
                overflowY: 'scroll',
            }}
        >
            {
                activeBucket.length > 0 ? (
                    activeBucket.map((toDo, index) => (
                        <ToDo
                            key={index}
                            toDo={toDo}
                            check={() => check(String(toDo.id))}
                            uncheck={() => uncheck(String(toDo.id))}
                        />
                    ))
                ) : (
                    <Typography
                        variant="body1"
                        color="textSecondary"
                    >
                        No To Dos
                    </Typography>
                )
            }
        </Box>
    </Stack>
  )
}

export default ToDos