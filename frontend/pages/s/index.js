import React from 'react'
import { ThemeProvider } from '@mui/material/styles';



import dynamic from 'next/dynamic'
import { rwTheme } from '../../components/tema/temaPrincipala';
import CreazaShort from '../../components/s/CreazaShort';

const Parti = dynamic(
    () => import('../../components/Particule'),
    { ssr: false }
  )


export default function quiz() {
  return (
    <ThemeProvider theme={rwTheme}>
        <div className="page-header">
                <div className="content-center">
                    <CreazaShort/>
                </div>
            <Parti/>
        </div>
    </ThemeProvider>
  )
}
