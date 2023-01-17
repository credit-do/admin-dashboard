import { FC, ComponentType } from 'react';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';

const clientSideEmotionCache = createEmotionCache();

interface Props {
  Component: ComponentType<any>;
  pageProps?: object;
  emotionCache?: EmotionCache;
}

const App : FC<Props> = ({ Component, emotionCache = clientSideEmotionCache, pageProps}) => {

  return (
      <CacheProvider value={emotionCache}>
        <Head>
          <title>
            Material Kit Pro
          </title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <Component {...pageProps} />
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>

  );
};

export default App;
