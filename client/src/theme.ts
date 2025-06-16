import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#153151',          // dark blue
            contrastText: 'white',    // white
            light: '#91A1BB'          // light blue
        },
        secondary: {
            main: '#D7B81F',          // yellow
            contrastText: '#3E1914'   // brown
        }
    }
})