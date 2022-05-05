import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React, { useState, useEffect } from 'react';

import Image from 'next/image'

import dynamic from "next/dynamic";

import Head from 'next/head';
import Navbar from '../components/Navbar';
import PageFooter from '../components/PageFooter';
import BasicInfo from '../components/nm/BasicInfo';
import RealDeal from '../components/nm/RealDeal';

const Welcome = dynamic(
  () => {
    return import('../components/nm/Welcome');
  },
  { ssr: false }
);


function Nm() {
  
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [user, setUser] = useState(false);

  const [scan, setScan] = useState(false);

  const [donatii, setDonatii] = useState(false);
  
  const router = useRouter()
  const { cod } = router.query

  const cookies = new Cookies();
  const c = cookies.get("riverwolves_cod_noaptea_muzeelor");


  const fetchDonatii = () => {
    fetch('/api/th/donatii_api', {
      method: 'POST',
    }).then((raspuns) => {
      if(raspuns.ok){
        raspuns.json().then((rdon) =>{
          setDonatii(rdon.donatii)
        })
      }else{
        snack("Eroare la server! Incercati mai tarziu!")
      }

    });
}

  const fetchUser = () => {
      fetch('/api/th/get_jucator_api', {
        method: 'POST',
        body: JSON.stringify({cod: cod})
      }).then((raspuns) => {
        if(raspuns.ok){
          raspuns.json().then((udat) =>{
            fetchDonatii();
            if(!!udat.rez){
              setUser(udat.rez);
            }else{
              snack("Te rugam sa nu scanezi alte coduri..")
            }
          })
        }else{
          snack("Eroare la server! Incercati mai tarziu!")
        }

      });
  }


      useEffect(()=>{
        fetchDonatii();
        if(!!cod){
          if(c===cod){
            fetchUser();
          }else{
            cookies.set('riverwolves_cod_noaptea_muzeelor', cod, { path: '/noaptea-muzeelor', maxAge: 60*60*24*31*2});
            router.reload();
          }
        }else if(!!c){
          router.replace('/noaptea-muzeelor?cod='+c, undefined, { shallow: false })
        }
      },[cod])

  

  

  const handleResult = (result, err) =>{
    if (!!result) {
      const _cod = result?.text.replace("https://ro049.com/noaptea-muzeelor/?cod=","")
      const cookies = new Cookies();
 
      cookies.set('riverwolves_cod_noaptea_muzeelor', _cod, { path: '/noaptea-muzeelor', maxAge: 60*60*24*31*2});
      router.reload()
    }
  }

  const snack = (mesaj) => {
    setSnackMessage(mesaj);
    setSnackOpen(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSnackOpen(false);
  };

    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseSnack}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    function onChange(value) {
      console.log("Captcha value:", value);
    }

    return (
      <>
      <Snackbar
                open={snackOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
                message={snackMessage}
                action={action}
      />

      <div className="landing-page sidebar-collapse">
        <Head>
          <title>Noaptea Muzeelor</title>
        </Head>
        <Navbar/>
        <div className="wrapper">
          {(!user && !c) && <Welcome/>}
          {/* {(!!user || !!c) && <Image src="/pisica-nm.jpg" width={4805} height={3383}/>} */}
          <div className="main section container text-center">
            {/* {(!!user || !!c) && <img src="/pisica-nm.jpg"/>} */}
            {user ? <RealDeal snack={snack} user={user} fetchUser={fetchUser} fetchDonatii={fetchDonatii} donatii={donatii}/>:<BasicInfo scan={scan} setScan={setScan} user={user} handleResult={handleResult}  fetchDonatii={fetchDonatii} donatii={donatii}/>}
          </div>
        </div>
        <PageFooter/>
      </div>
      
    </>
    )
}

export default Nm