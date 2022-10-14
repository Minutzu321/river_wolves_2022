import React from 'react'
import { ThemeProvider } from '@mui/material/styles';



import dynamic from 'next/dynamic'
import GenCod from '../../components/quiz/GenCod';
import { rwTheme } from '../../components/tema/temaPrincipala';

const Parti = dynamic(
    () => import('../../components/Particule'),
    { ssr: false }
  )


export default function quiz() {
  return (
    <ThemeProvider theme={rwTheme}>
        <div className="page-header">
                <div className="content-center">
                    <GenCod/>
                </div>
            <Parti/>
        </div>
    </ThemeProvider>
  )
}
