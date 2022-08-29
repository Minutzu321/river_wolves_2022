

import { styled } from '@mui/material/styles';
import axios from 'axios';

import { useEffectOnce } from 'usehooks-ts'
import { useSession, signIn, getSession} from "next-auth/react"
import { useEffect, useState } from 'react';

import FeedbackSedinta from '../../components/dashboard/FeedbackSedinta';
import Firmituri from '../../components/dashboard/Firmituri';
import Login from '../../components/dashboard/Login';
import Rezumat from '../../components/dashboard/Rezumat';
import Matrita from '../../components/dashboard/Matrita';
import { subscribe, unsubscribe, publish, NUME_EVENT } from '../../libs/events';
import Useri from '../../components/dashboard/Useri';

import useWebSocket, { ReadyState } from 'react-use-websocket';


export default function Dash() {

  const {data: session} = useSession()

  const [load, setLoad] = useState(true)

  const [autorizat, setAutorizat] = useState(false)
  const [infos, setInfos] = useState(false)
  const [err, setErr] = useState(false)

  const [user, setUser] = useState({})
  const [sedinte, setSedinte] = useState([])
  const [taskuri, setTaskuri] = useState([])

  if(typeof window !== 'undefined'){
    subscribe("doneInfos", () => {
      autorizeaza();
    })

    subscribe("loading", () => {
      setLoad(true)
    })
  }

  //INITIALIZEAZA SOCKET
  
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    'wss://live.ro049.com',
    {
      shouldReconnect: (closeEvent) => {
        return true;
      },
      
      reconnectAttempts: 100,
      reconnectInterval: 3000,
    }
    );

    //INITIALIZEAZA EVENT PROPAGATION
    useEffect(() => {
      const handleUpdateMembri = () => {
        console.log("trimi");
        sendMessage(NUME_EVENT.UPDATE_MEMBRI)
      };
      unsubscribe(NUME_EVENT.UPDATE_MEMBRI, () => sendMessage(NUME_EVENT.UPDATE_MEMBRI))
      if (readyState === 0) {
        console.log("SUBBED");
        subscribe(NUME_EVENT.UPDATE_MEMBRI, () => sendMessage(NUME_EVENT.UPDATE_MEMBRI))
      }
    }, [readyState]);


    //INITIALIZEAZA EVENT LISTENER
    useEffect(() => {
      if (lastMessage !== null) {
        console.log("DATA",lastMessage.data);
        switch(lastMessage.data){
          case NUME_EVENT.UPDATE_MEMBRI:
            autorizeaza();
        }
      }
    }, [lastMessage]);

  function autorizeaza(){
    console.log("auth");
    axios.post('api/dash/auth')
      .then(res => {
        const data = res.data
        setErr(data.err);
        if(!data.err){
          setLoad(false);
          setInfos(data.inf)
          setAutorizat(data.aut)
          setSedinte(data.sedinte)
          setTaskuri(data.taskuri)
          setUser(data.user)
        }
      })
  }

  useEffect(() => {
    autorizeaza();
  }, [])

  
  
  if (session) {
  return (
    <Matrita err={err} load={load} autorizat={autorizat} infos={infos} comp={<>
      <Firmituri/>    
      <Rezumat/>
      <br/>
      <FeedbackSedinta/>
      <br/>
      <Useri user={user}/>
    </>}/>
  )
  }else{
    return (
      <Login/>
    )
  }
}