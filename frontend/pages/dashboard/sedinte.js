import React from 'react'

import Head from 'next/head'
import Navbar from '../../components/Navbar'
import PageFooter  from '../../components/PageFooter'
import PageHeader from '../../components/PageHeader'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Sedinta from '../../components/dashboard/Sedinta';
import Firmituri from '../../components/dashboard/Firmituri'

import GroupsIcon from '@mui/icons-material/Groups';

function sedinte() {
  return (
    <div className="landing-page sidebar-collapse">
      <Head>
        <title>RiverBoard</title>
      </Head> 
      <Navbar/>
      <div className="wrapper">
        <PageHeader titlu={"RiverBoard"}
          subtitlu={"Sistem de management al echipei"}
          subsubtitlu={"Bine ai venit, Mina"}/>
        <div className="main">
          <div className="container">
            <br/>
            <Firmituri pag={"Sedinte"} icon={<GroupsIcon sx={{ mr: 0.5 }} fontSize="inherit" />}/>
            <br/>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4 , sm: 8, md: 12 }}>
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Sedinta/>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
      <PageFooter/>
    </div>
  )
}

export default sedinte