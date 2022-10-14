import {createTheme } from '@mui/material/styles';

export const rwTheme = createTheme({
    palette: {
      primary: {
        main: '#fffff',
      },
      secondary: {
        main: '#484848',
      },
      
    },
    typography: {
      fontFamily: [
        'Kanit',
      ].join(','),
    },
  });

  export const rwThemeDark = createTheme({
    palette: {
        mode: 'dark',
      primary: {
        main: '#fffff',
      },
      secondary: {
        main: '#484848',
      },
      
    },
    typography: {
      fontFamily: [
        'Kanit',
      ].join(','),
    },
  });