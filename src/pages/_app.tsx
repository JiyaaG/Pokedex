import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { api, trpcClientOptions } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import baseTheme from '../theme';


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  
  const theme = createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <api.Provider client={api.createClient(trpcClientOptions)} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </api.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
