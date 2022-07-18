import React from 'react'

import Head from 'next/head';
import { NextPage } from 'next';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import DashboardLayout from '../components/layout/DashboardLayout';
import UpcomingEvents from '../components/work/UpcomingEvents';
import Calendar from '../components/work/Calendar';
import PageHeader from '../components/utility/PageHeader';

const Work : NextPage = () => {
  return (
    <DashboardLayout>
        <Head>
            <title>
                Work | Credit Do
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 4
            }}
        >
            <Container 
                maxWidth={false}
            >
                <Stack
                    spacing={4}
                >
                    <PageHeader 
                        title='Work'
                        actionButton={
                            <Link
                              href='/create/event'
                              passHref
                            >
                                <Button
                                    variant='contained'
                                >
                                    Create Event
                                </Button>
                            </Link>
                        }
                    />
                    <Stack
                        direction='row'
                        spacing={1}
                    >
                        <UpcomingEvents />
                        <Stack
                            flex={1}
                        >
                            <Calendar />
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    </DashboardLayout>
  )
}

export default Work