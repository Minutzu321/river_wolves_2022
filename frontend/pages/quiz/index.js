import React from 'react'
import { ThemeProvider } from '@mui/material/styles';



import dynamic from 'next/dynamic'
import CodSecret from '../../components/quiz/CodSecret';
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
                    <CodSecret/>
                </div>
            <Parti/>
        </div>
    </ThemeProvider>
  )
}
