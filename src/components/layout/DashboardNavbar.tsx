import React from 'react';

import Link from 'next/link';

import { 
  AppBar, 
  Avatar, 
  Box, 
  IconButton, 
  Toolbar, 
  Tooltip, 
  Typography, 
  Theme,
  styled
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { UserCircle as UserCircleIcon } from '../../icons/user-circle';

import { sidebarWidth } from './DashboardSidebar';

import useAuth from '../../hooks/useAuth';

const DashboardNavbarRoot = styled(AppBar)(({ theme } : {theme: Theme}) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

interface Props {
  onSidebarOpen: () => void;
}

const DashboardNavbar : React.FC<Props> = ({ onSidebarOpen, ...other}) => {

  const { user } = useAuth();
  console.log(user);
  return (
    <DashboardNavbarRoot
      sx={{
        left: {
          lg: sidebarWidth
        },
        width: {
          lg: `calc(100% - ${sidebarWidth}px)`
        }
      }}
      {...other}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton
          onClick={onSidebarOpen}
          sx={{
            display: {
              xs: 'inline-flex',
              lg: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Notifications">
          <IconButton sx={{ ml: 1 }}>
            <NotificationsIcon 
              fontSize="small"
              color='primary'
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Mail">
          <IconButton>
            <EmailIcon 
              fontSize="small"
              color='primary'
            />
          </IconButton>
        </Tooltip>
        {user && (
          <>
            <Typography 

              variant='body2' 
              color='text.primary'
              sx={{
                ml: 1,
              }}
            >
              Welcome, {user.firstName} {user.lastName}!
            </Typography>
            <Link
              href='/account'
              passHref
            >
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                  ml: 2
                }}
                src={user.profilePicture}
              >
                <UserCircleIcon fontSize="small" />
              </Avatar>
            </Link>
          </>
        )}
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

export default DashboardNavbar;