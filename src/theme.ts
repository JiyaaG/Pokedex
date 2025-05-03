import { createTheme } from '@mui/material/styles';

// Create base theme
const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#FF1B1B',
      light: '#FF5C5C',
      dark: '#E50000',
    }
  }
});

// Create dark theme components
const darkThemeComponents = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backgroundColor: '#1E1E1E',
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        backgroundColor: '#1E1E1E',
      }
    }
  }
};

// Create the theme with dark mode overrides
export const theme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    // Use system preference for mode
    mode: 'light',
    // Dark mode overrides
    ...(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches && {
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },
      background: {
        default: '#121212',
        paper: '#1E1E1E',
      }
    })
  },
  components: {
    ...(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches && darkThemeComponents)
  }
}); 