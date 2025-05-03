import { createTheme } from '@mui/material/styles';

// Create a simple light theme without system preference detection
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

export default theme; 