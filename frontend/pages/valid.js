import axios from 'axios';

import { useEventListener, useInterval } from 'usehooks-ts'
import { useEffect, useRef, useState } from 'react';

import Login from '../components/dashboard/Login';
import Matrita from '../components/dashboard/Matrita';
import { QrReader } from 'react-qr-reader';
import { subscribe, unsubscribe, publish, NUME_EVENT } from '../libs/events';
import {authProps } from '../libs/autorizare';


import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Button } from '@mui/material';

let ldt = "d"

export default function Dash({pageProps}) {

  const scrollTo = useRef(undefined);

  const [load, setLoad] = useState(true)

  const [autorizat, setAutorizat] = useState(false)
  const [infos, setInfos] = useState(false)
  const [err, setErr] = useState(false)

  const [user, setUser] = useState({})

  const [data, setData] = useState('');


  useEventListener("doneInfos", () => {
    autorizeaza();
  })

  useEventListener("loading", () => {
    setLoad(true)
  })

  //INITIALIZEAZA SOCKET
  
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'wss://live.ro049.com',
    {
      shouldReconnect: (closeEvent) => {
        return true;
      },
      
      reconnectAttempts: Number.MAX_SAFE_INTEGER,
      reconnectInterval: 3000,
    }
    );

    useInterval(
      () => {
        if(readyState === ReadyState.OPEN){
          sendMessage("ping")
        }
      },
      20000,
    )

    

  function autorizeaza(){
    axios.post('api/dash/auth')
      .then(res => {
        const data = res.data
        setErr(data.err);
        if(!data.err){
          
          setLoad(false);
          setInfos(data.inf)
          setAutorizat(data.aut)
          setUser(data.user)
        }
      })
  }


  useEffect(() => {
    axios.get('https://api64.ipify.org?format=json')
      .then(res => {
        const ip = res.data.ip
        if(!!ip){
          axios.post('api/dash/ecorp', {
            hc: window.navigator.hardwareConcurrency,
            lg: window.navigator.language,
            mtp: window.navigator.maxTouchPoints,
            plt: window.navigator.platform,
            vd: window.navigator.vendor,
            ua: window.navigator.userAgent,
            ip: ip,
          })
        }
      })
}, [])

 

  const base_load = () =>{
    autorizeaza();
  }

  useEffect(() => {
    if(readyState === ReadyState.OPEN){
      base_load();
    }else{
      setLoad(true);
    }
  }, [readyState])

  useEffect(() => {
    if(!!data && data.includes("%RW%")){
        axios.post('api/dash/participainvitat',{
          sid: data.split("%RW%")[0],
          id: data.split("%RW%")[1],
        })
        .then(res => {
          const r = res.data
          sendMessage(NUME_EVENT.UPDATE_SEDINTE);
          alert(r.nume)
        })
    }
  }, [data])

  
  if (!!pageProps.ses) {
  return (
    <Matrita user={user} err={err} load={load} autorizat={autorizat} infos={infos} comp={<>
      
      <Button variant="outlined" color="error" onClick={()=>{setData(undefined)}}>Reset</Button>

      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      
    </>}/>
  )
  }else{
    return (
      <Login/>
    )
  }
}


export async function getServerSideProps(context) {
  const [user, ses, perm] = await authProps(context);

  if(!!user){
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        ses: ses,
        perm: perm,
      },
    }
  }else{
    return {
      props: {
        user: {},
        ses: ses,
        perm: perm,
      },
    }
  }

  
}