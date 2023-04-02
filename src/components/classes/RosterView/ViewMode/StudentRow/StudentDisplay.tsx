import { FC } from 'react'


import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import useAvatar from '../../../../../hooks/useAvatar'

interface Props {
    firstName: string
    lastInitial: string
    profilePicture: string
}

const StudentDisplay : FC<Props> = ({ firstName, lastInitial, profilePicture }) => {

  let { uri } = useAvatar();
  if (profilePicture) {
    uri = profilePicture;
  }
  console.log(uri);
  return (
    <Stack
      direction="row"
      alignItems='center'
      spacing={2}
      width='100%'
    >
      <Avatar 
        src={uri}
        alt={`Profile picture`}
        sx={{
          height: 40,
          width: 40
        }}
      />
      <Typography>
        {firstName} {lastInitial}.
      </Typography>
    </Stack>
  )
}

export default StudentDisplay