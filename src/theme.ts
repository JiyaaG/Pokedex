import { createTheme } from '@mui/material/styles';

// Create a theme instance with light mode
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF1B1B',
      light: '#FF5C5C',
      dark: '#E50000',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#171717',
      secondary: 'rgba(0, 0, 0, 0.7)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#ffffff',
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

export default theme; 