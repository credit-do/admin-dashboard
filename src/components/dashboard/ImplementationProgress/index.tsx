import React, { useEffect, useState } from 'react'
import { auth, secondaryAuth } from '../../../firebase/clientApp';

import Skeleton from '@mui/material/Skeleton'

import SectionContainer from '../utility/SectionContainer';
import DonutView from './DonutView';
import ToDos from '../ToDos';

import { statuses } from '../../../hooks/types';
import useToDos from '../../../hooks/useToDos';

interface Props {
  compact?: boolean;
  classId: string;
}
const ImplementationProgress : React.FC<Props> = ({ compact, classId }) => {

  const { toDoBuckets, loading, check, uncheck } = useToDos(classId);
  // console.log(toDoBuckets);
  // const [activeBucket, setActiveBucket] = useState<typeof statuses[number]>('Not Started');

  // const onClick = (status: typeof statuses[number]) => {
  //   if(status !== activeBucket){
  //     setActiveBucket(status);
  //   }
  // }

  return (
    <SectionContainer
        title='To-Do List'
        compact={compact}
        navigateTo='/learn'
    >
      {
        loading ? (
          <Skeleton
            variant="rectangular"
          />
        ) : (
          <>
            {/* <DonutView
              compact={compact}
              statusCount={{
                'Not Started': toDoBuckets['Not Started'].length,
                'Past Due': toDoBuckets['Past Due'].length,
                'Completed': toDoBuckets['Completed'].length
              }}
              setActiveBucket={onClick}
            /> */}
            {
              !compact && (
                <ToDos
                  toDos={toDoBuckets}
                  check={check}
                  uncheck={uncheck}
                />
              )
            }
          </>
        )
      }
    </SectionContainer>
  )
}

export default ImplementationProgress