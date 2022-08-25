import React from 'react'

import Head from 'next/head'
import Navbar from '../../components/Navbar'
import PageFooter  from '../../components/PageFooter'
import dynamic from 'next/dynamic'

import {signIn} from "next-auth/react"

const Parti = dynamic(
    () => import('../../components/Particule'),
    { ssr: false }
  )

export default function Login() {

  return (
    <div className="landing-page sidebar-collapse">
      <Head>
        <title>RiverBoard</title>
      </Head> 
      <Navbar/>
      <div className="wrapper">
      <div className="page-header clear-filter" filter-color="orange">
            
            <div className="page-header-image" data-parallax="true"/>
            
            <div className="container">
                
                <div className="content-center brand">
                
                    <img className="rvw-logo" src="rw.png" alt=""/>
                    <h1 className="h1-seo">Oops</h1>
                    <h3>Nu stim cine esti</h3>
                    <h5>Apasa butonul de mai jos ca sa intri in cont</h5>
                    <button onClick={() => signIn()} className="btn btn-primary">Logheaza-te</button>
                    
                    
                </div>
                
            </div>
            <Parti/>
        </div>
      </div>
      <PageFooter/>
    </div>
  )
}
