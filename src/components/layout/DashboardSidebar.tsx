import { useEffect, FC } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Box, Drawer, useMediaQuery, Theme, Stack } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SavingsIcon from '@mui/icons-material/Savings';

import Logo from './Logo';
import NavItem from './NavItem';

export const sidebarWidth = 100;

const items = [
  {
    href: '/',
    icon: (<HomeIcon fontSize="large" />),
    title: 'Dashboard'
  },
  {
    href: '/classes',
    icon: (<GroupIcon fontSize="large" />),
    title: 'Classes'
  },
  {
    href: '/learn',
    icon: (<SchoolIcon fontSize="large" />),
    title: 'Learn'
  },
  {
    href: '/work',
    icon: (<HandshakeIcon fontSize="large" />),
    title: 'Work'
  },
  {
    href: '/save',
    icon: (<SavingsIcon fontSize="large" />),
    title: 'Save'
  }
];

interface Props {
  onClose: () => void;
  open: boolean;
}

const DashboardSidebar : FC<Props> = ({ onClose, open }) => {

  const router = useRouter();
  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
        }}
      >
        <div>
          <Box sx={{ p: 2 }}>
            <NextLink
              href="/"
              passHref
            >
                <Logo
                  size={lgUp ? 75 : 50}
                />
            </NextLink>
          </Box>
        </div>
        <Stack
          flexGrow={1}
          alignItems="center"
        >
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Stack>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'primary.main',
            color: '#FFFFFF',
            width: sidebarWidth
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main',
          color: '#FFFFFF',
          width: sidebarWidth
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;