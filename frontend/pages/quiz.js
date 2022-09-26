import React from 'react'
import {ThemeProvider, createTheme } from '@mui/material/styles';



import dynamic from 'next/dynamic'
import CodSecret from '../components/quiz/CodSecret';
import GenCod from '../components/quiz/GenCod';
const Parti = dynamic(
    () => import('../components/Particule'),
    { ssr: false }
  )



const theme = createTheme({
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

export default function quiz() {
  return (
    <ThemeProvider theme={theme}>
        <div className="page-header">
                <div className="content-center">
                    <GenCod/>
                </div>
            <Parti/>
        </div>
    </ThemeProvider>
  )
}
