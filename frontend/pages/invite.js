import axios from 'axios';

import { useEventListener, useInterval } from 'usehooks-ts'
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from 'react';


import Login from '../components/dashboard/Login';

import { QRCode } from 'react-qrcode-logo';

import Matrita from '../components/dashboard/Matrita';
import {NUME_EVENT } from '../libs/events';
import {authProps } from '../libs/autorizare';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Avatar, Chip, Typography } from '@mui/material';
import { addOre, intreDate, saptziluna } from '../libs/data';
import { badgeColor, badgeImg } from '../libs/badge';
import { getParticipanti, getPrezenti, prezent } from '../libs/participari';

export default function Invite({pageProps}) {

  // const documentRef = useRef<Document>(document)

  const scrollTo = useRef(undefined);

  const [load, setLoad] = useState(true)

  const [infos, setInfos] = useState(false)
  const [err, setErr] = useState(false)
  const [sedinte, setSedinte] = useState([])

  const [user, setUser] = useState({})

  const [sedintaAcum, setSedintaAcum] = useState(undefined)

  const executeScroll = () => scrollTo.current.scrollIntoView() 

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

    //EVENT PROPAGATION
    useEventListener(NUME_EVENT.UPDATE_MEMBRI, () => {
      sendMessage(NUME_EVENT.UPDATE_MEMBRI);
      autorizeaza();
    })

    useInterval(
      () => {
        if(readyState === ReadyState.OPEN){
          sendMessage("ping")
        }
      },
      20000,
    )


    //INITIALIZEAZA EVENT LISTENER
    useEffect(() => {
      if (lastMessage !== null) {
        switch(lastMessage.data){
          case NUME_EVENT.UPDATE_MEMBRI:
            autorizeaza();
        case NUME_EVENT.UPDATE_SEDINTE:
            fetchSedinte();
        }
      }
    }, [lastMessage]);

    

  function autorizeaza(){
    axios.post('api/dash/auth',{
        ign: true
    })
      .then(res => {
        const data = res.data
        setErr(data.err);
        if(!data.err){
          setLoad(false);
          setInfos(data.inf)
          setUser(JSON.parse(JSON.stringify(data.user)))
        }
      })
  }

  function fetchSedinte(){
    axios.post('api/dash/sedinte')
      .then(res => {
        const data = res.data
        if(!data.err){
          setSedinte(JSON.parse(JSON.stringify(data.sedinte)));
        }
      })
  }

  useEffect(() => {
    let gasita = false;
    sedinte.forEach((ss) => {
        let max_prez_data = addOre(ss.durata+1,new Date(ss.data_ora));
        if(intreDate(new Date(ss.data_ora), max_prez_data, new Date())){
            gasita = true;
            
            setSedintaAcum({
                ...ss,
                badgeColor: badgeColor(ss.departament),
                badgeImg: badgeImg(ss.departament),
                data_sed: saptziluna(new Date(ss.data_ora)),
                prezenti: getPrezenti(ss.participari).length,
                interval: new Date(ss.data_ora).toTimeString().substring(0, 5)+"-"+addOre(ss.durata,new Date(ss.data_ora)).toTimeString().substring(0, 5),
                prezent: prezent(user.nume, ss.participari),
            })
        }
      });

      if(!gasita){
        setSedintaAcum(undefined);
      }
  }, [sedinte]);


  const base_load = () =>{
    autorizeaza();
    fetchSedinte();
  }

  useEffect(() => {
    fetchSedinte();
  }, [user])

  useEffect(() => {
    if(readyState === ReadyState.OPEN){
      base_load();
    }else{
      setLoad(true);
    }
  }, [readyState])
  
  if (!!pageProps.ses) {
  return (
    <Matrita user={user} err={err} load={load} autorizat={true} infos={infos} comp={<>
        
        {!!sedintaAcum?<>
        {!sedintaAcum.prezent?<>
                <div className="text-center">
                    <Typography variant="h3">Scaneaza codul</Typography>
                    <br/>
                    <Typography variant="p">Cauta membrul care scaneaza codurile la usa si arata-i codul QR de mai jos</Typography>
                    <hr/>
                    <Chip variant="outlined" color={sedintaAcum.badgeColor} label={sedintaAcum.titlu} avatar={<Avatar src={sedintaAcum.badgeImg} />} />
                    <br/>
                    <Typography variant="p">{sedintaAcum.desc}</Typography>

                </div>
                <div ref={scrollTo} style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50px',
                        }}>
                            
                            <QRCode 
                                {...{
                                    value: user.sid+"%RW%"+sedintaAcum.id,
                                    ecLevel:"H",
                                    logoImage:"https://ro049.com/favicon.ico",
                                    qrStyle: "dots",
                                    size: 200,
                                    eyeRadius: [
                                        {
                                            outer: [1, 1, 10, 1],
                                            inner: [1, 1, 10, 1],
                                        },
                                        {
                                            outer: [1, 1, 1, 10],
                                            inner: [1, 1, 1, 10],
                                        },
                                        {
                                            outer: [1, 10, 1, 1],
                                            inner: [1, 10, 1, 1],
                                        }
                                    ],
                                    eyeColor: [
                                        {
                                            outer: '#000000',
                                            inner: '#000000'
                                        },
                                        {
                                            outer: '#000000',
                                            inner: '#000000'
                                        },
                                        {
                                            outer: '#000000',
                                            inner: '#000000'
                                        },
                                    ]
                                }}
                            />
                            
            </div>
        </>:<>
            <div className="text-center">
                <Chip variant="outlined" color={sedintaAcum.badgeColor} label={sedintaAcum.titlu} avatar={<Avatar src={sedintaAcum.badgeImg} />} />
                <br/>
                <Typography variant="h6">{sedintaAcum.desc}</Typography>
                <br/>
                <Typography variant="h6">Participanti: {sedintaAcum.prezenti}</Typography>
                <br/>
                <Typography variant="p">{sedintaAcum.data_sed}</Typography>
                <br/>
                <Typography variant="p">Interval orar: {sedintaAcum.interval}</Typography>

            </div>
        </>}
        </>:<>
        <div className="text-center">
            <Typography variant="h3">Nu sunt sedinte</Typography>
            <br/>
            <Typography variant="p">In momentul de fata nu este nicio sedinta in desfasurare.</Typography>
            <br/>
        </div>       
      </>}
      <br/>
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

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      ses: ses,
      perm: perm,
    },
  }
}