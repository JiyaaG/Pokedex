import { createTheme, alpha } from '@mui/material/styles';

// Create a theme instance with proper light/dark mode support
export const createAppTheme = (mode: 'light' | 'dark') => {
  const baseTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#FF1B1B',
        light: '#FF5C5C',
        dark: '#E50000',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#171717' : '#ffffff',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          }
        }
      }
    }
  });

  return baseTheme;
}; 