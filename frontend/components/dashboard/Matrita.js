import React from 'react'

import Head from 'next/head'
import Navbar from '../../components/Navbar'
import PageFooter  from '../../components/PageFooter'
import PageHeader from '../../components/PageHeader'

import Neautorizat from '../../components/dashboard/Neautorizat';
import Loading from '../../components/dashboard/Loading';
import Eroare from '../../components/dashboard/Eroare';
import DatePersonale from './DatePersonale'

export default function Matrita({load, infos, autorizat, comp, err}) {
  return (
    <div className="landing-page sidebar-collapse">
      <Head>
        <title>RiverBoard</title>
      </Head> 
      <Navbar/>
      <div className="wrapper">
        <PageHeader titlu={"RiverBoard"}
          subtitlu={"Sistem de management al echipei"}
          subsubtitlu={err?"Eroare la server..":load?"Se incarca..":infos?"Nu stim cine esti":autorizat?"Saluti":"Cont neautorizat"}/>
        <div className="main">
          <div className="container">
            <br/>

            {err?<Eroare/>:load?<Loading/>:infos?<DatePersonale/>:autorizat?
              {comp}
            :<Neautorizat/>}
            

          </div>
        </div>
      </div>
      <PageFooter/>
    </div>
  )
}
