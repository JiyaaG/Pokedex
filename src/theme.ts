import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF1B1B',
      light: '#FF5C5C',
      dark: '#E50000',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#FFFFFF',
    },
    h2: {
      color: '#FFFFFF',
    },
    h3: {
      color: '#FFFFFF',
    },
    h4: {
      color: '#FFFFFF',
    },
    h5: {
      color: '#FFFFFF',
    },
    h6: {
      color: '#FFFFFF',
    },
    subtitle1: {
      color: '#FFFFFF',
    },
    subtitle2: {
      color: '#FFFFFF',
    },
    body1: {
      color: 'rgba(255, 255, 255, 0.9)',
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
}); 