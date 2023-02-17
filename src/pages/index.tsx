import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Box, Container, CircularProgress, Stack, Button, Typography } from '@mui/material';

import DashboardLayout from '../components/layout/DashboardLayout';
import ClassView from '../components/dashboard/ClassView';

import useClasses from '../hooks/useClasses';
import useAuth from '../hooks/useAuth';
import PageHeader from '../components/utility/PageHeader';

const Dashboard : NextPage = () => {

  const router = useRouter();

  const { auth, loading } = useAuth();

  const { classes } = useClasses();

  if (loading) return (
    <Stack
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <CircularProgress />
    </Stack>
  );
  if (!auth) {
    router.push('/login'); 
    return null;
  }

  return (
    <DashboardLayout>
      <Head>
        <title>
          Dashboard | Credit Do
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container 
          maxWidth={false}
        >
          <Stack
            spacing={2}
          >
            <PageHeader 
              title='Dashboard'
              actionButton={
                <Link
                  href='/create/class'
                  passHref
                >
                  <Button
                      variant='contained'
                  >
                    Create Class
                  </Button>
                </Link>
              }
            />
            {
              classes.length > 0 ? (
                classes.map(classData => (
                  <ClassView
                    key={classData.id}
                    classData={classData}
                  />
                ))
              ) : (
                <Stack
                  alignItems='center'
                  spacing={2}
                >
                  <Typography>You have not created an classes yet.</Typography>
                  <Link
                    href='/create/class'
                    passHref
                  >
                    <Button
                        variant='contained'
                    >
                      Create Class
                    </Button>
                  </Link>
                </Stack>
              )
            }
          </Stack>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
export default Dashboard;
