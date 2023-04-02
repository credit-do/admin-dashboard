import React from 'react'

import Stack from '@mui/material/Stack';

import DonutChart from './DonutChart';

import { statuses } from '../../../hooks/types';

type StatusCount = {
  [key in typeof statuses[number]]: number;
}

const colors = {
  'Not Started': '#dcdcdc',
  'Past Due': '#de483a',
  'Completed': '#9fc440'
}

interface Props {
  compact?: boolean;
  statusCount: StatusCount;
  setActiveBucket: (status: typeof statuses[number]) => void;
}

const DonutView : React.FC<Props> = ({ setActiveBucket, compact, statusCount }) => {

  const total = Object.values(statusCount).reduce((acc, curr) => acc + curr, 0);

  return (
    <Stack 
      direction="row"
      justifyContent="center"
    >
      <DonutChart
        data={statuses.map((status) => ({ label: status, value: statusCount[status] / total * 100 }))}
        colors={statuses.map((status) => colors[status])}
        strokeColor={null}
        formatValues={(value) => `${value}%`}
        height={compact ? 150 : 200}
        width={compact ? 150 : 200}
        legend={true}
        onClick={(status) => {
          setActiveBucket(status.label as typeof statuses[number]);
        }}
      />
    </Stack>
  )
}

export default DonutView