import {createTheme} from "@mui/material";

export const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#04AA6D",
        },

        textWhite: {
            light: '#fdfdfdce',
            main: '#fdfdfdce',
            dark: '#fdfdfdce',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
    }
});