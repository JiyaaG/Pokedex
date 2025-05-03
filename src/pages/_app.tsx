import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { api, trpcClientOptions } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery, createTheme } from '@mui/material';
import { theme as baseTheme } from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(baseTheme);

  useEffect(() => {
    // Update theme when system preference changes
    const newTheme = createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    });
    setTheme(newTheme);
  }, [prefersDarkMode]);

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
