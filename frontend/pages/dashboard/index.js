import Head from 'next/head'
import Navbar from '../../components/Navbar'
import PageFooter  from '../../components/PageFooter'
import PageHeader from '../../components/PageHeader'

import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import { useSession, signIn, getSession} from "next-auth/react"
import { useState, useEffect } from 'react';
import { useInterval } from 'usehooks-ts'
import FeedbackSedinta from '../../components/dashboard/FeedbackSedinta';
import Sedinta from '../../components/dashboard/Sedinta';
import { saptziluna } from '../../utils/data';
import Firmituri from '../../components/dashboard/Firmituri';
import Login from '../../components/dashboard/Login';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: 1,
  textAlign: 'center',
}));


export default function Dash() {

  const [salut, setSalut] = useState("");
  const [dat, setDat] = useState("");

  

  const hello = () => {
      let azi = new Date();

      setDat("Azi - "+saptziluna(azi))

      if(azi.getHours() < 3){
        setSalut("Noapte buna!")
      }else if(azi.getHours() < 12){
        setSalut("Neata!")
      }else if(azi.getHours() < 18){
        setSalut("Salut!")
      }else if(azi.getHours() < 22){
        setSalut("Buna seara!")
      }else{
        setSalut("Noapte buna!")
      }
  }

  useEffect(() => {
    hello();
  }, [])
  

  useInterval(
    () => {
      hello();
    },
    5000,
  )

  const { data: session } = useSession()
  if (session) {
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
            <Firmituri/>


            <div className="card text-center">
              <div className="card-header mt-2">
                {salut}
              </div>
              <div className="card-body">
                <h4 className="card-title">Rezumatul zilei de azi</h4>
                <p className="card-text">3 sedinte, 8 taskuri de indeplinit in total</p>
                <a href="#" className="btn btn-primary">Vezi sedintele urmatoare</a>
              </div>
              <div className="card-footer text-muted mb-2">
                {dat}
              </div>
            </div>


            <br/>

            <FeedbackSedinta/>

          </div>
        </div>
      </div>
      <PageFooter/>
    </div>
  )
  }else{
    return (
      <Login/>
    )
  }
}