import React, { useState } from 'react';

import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { DashboardLayout } from '../components/dashboard-layout';
import Header from '../components/classes/Header';
import MetricsView from '../components/classes/MetricsView';
import RosterView from '../components/classes/RosterView';

export const displayOptions = [
    "Metrics",
    "Roster",
    "Leaderboard"
] as const;
export type DisplayOptionTypes = typeof displayOptions[number];  

const Displays = {
    Metrics: <MetricsView />,
    Roster: <RosterView />,
}

const Classes = () => {

    const [display, setDisplay] = useState<DisplayOptionTypes>(displayOptions[0]);

    const handleDisplayChange = (view : DisplayOptionTypes) => {
        setDisplay(view);
    }

    return (
        <>
            <Head>
                <title>
                    Classes | Credit Do
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
                        <Header 
                            display={display}
                            handleDisplayChange={handleDisplayChange}
                        />
                        {
                            Displays[display]
                        }
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

Classes.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Classes