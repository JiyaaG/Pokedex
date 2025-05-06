// src/theme.ts
import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    mode: 'light', // <-- ensures light mode is always used
    primary: {
      main: '#1976d2',
    },
    // other palette options here
  },
});

export default baseTheme;
