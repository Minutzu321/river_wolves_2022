

import { styled } from '@mui/material/styles';
import axios from 'axios';

import { useEffectOnce, useEventListener } from 'usehooks-ts'
import { useSession, signIn, getSession} from "next-auth/react"
import { useEffect, useRef, useState } from 'react';

import FeedbackSedinta from '../../components/dashboard/FeedbackSedinta';
import Firmituri from '../../components/dashboard/Firmituri';
import Login from '../../components/dashboard/Login';
import Rezumat from '../../components/dashboard/Rezumat';
import Matrita from '../../components/dashboard/Matrita';
import { subscribe, unsubscribe, publish, NUME_EVENT } from '../../libs/events';
import {useAuthProps } from '../../libs/autorizare';
import Useri from '../../components/dashboard/Useri';
import Sedinte from '../../components/dashboard/Sedinte';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function Dash({pageProps}) {

  // const documentRef = useRef<Document>(document)

  const {data: session} = useSession()

  const [load, setLoad] = useState(true)

  const [autorizat, setAutorizat] = useState(false)
  const [infos, setInfos] = useState(false)
  const [err, setErr] = useState(false)

  const [user, setUser] = useState({})
  const [sedinte, setSedinte] = useState([])
  const [taskuri, setTaskuri] = useState([])
  const [membri, setMembri] = useState([]);

  const [tab, setTab] = useState('1');

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  if(typeof window !== 'undefined'){
    useEventListener("doneInfos", () => {
      autorizeaza();
    })

    useEventListener("loading", () => {
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
      
      reconnectAttempts: 1000,
      reconnectInterval: 3000,
    }
    );

    //EVENT PROPAGATION
    useEventListener(NUME_EVENT.UPDATE_MEMBRI, () => {
      sendMessage(NUME_EVENT.UPDATE_MEMBRI);
      fetchMembri();
    })
    useEventListener(NUME_EVENT.UPDATE_SEDINTE, () => {
      sendMessage(NUME_EVENT.UPDATE_SEDINTE);
      autorizeaza();
    })


    //INITIALIZEAZA EVENT LISTENER
    useEffect(() => {
      if (lastMessage !== null) {
        console.log("DATA",lastMessage.data);
        switch(lastMessage.data){
          case NUME_EVENT.UPDATE_MEMBRI:
            autorizeaza();
          case NUME_EVENT.UPDATE_SEDINTE:
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

  function fetchMembri(){
    axios.post('api/dash/membri')
      .then(res => {
        const data = res.data
        if(!data.err){
          setMembri(data.membri);
          // setLoad(false);
          // setInfos(data.inf)
          // setAutorizat(data.aut)
          // setSedinte(data.sedinte)
          // setTaskuri(data.taskuri)
          // setUser(data.user)
        }
      })
  }

  useEffect(() => {
    autorizeaza();
    fetchMembri();
  }, [])

  
  
  if (!!pageProps.ses) {
  return (
    <Matrita err={err} load={load} autorizat={autorizat} infos={infos} comp={<>
      <Firmituri/>    
      <br/>
      <Rezumat/>
      <br/>
      <FeedbackSedinta/>

      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTab}
           textColor="secondary"
           indicatorColor="secondary"
           variant="scrollable"
           allowScrollButtonsMobile
           scrollButtons="auto"
          aria-label="Alege categoria">
            <Tab label="Sedinte" value="1" />
            <Tab label="Taskuri" value="2" />
            <Tab label="Treasurehunt" value="3" />
            <Tab label="Membri" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Sedinte user={user} sedinte={sedinte}/>
        </TabPanel>
        <TabPanel value="2">

        </TabPanel>
        <TabPanel value="3">
          
        </TabPanel>
        <TabPanel value="4">
          <Useri user={user} membri={membri}/>
        </TabPanel>
      </TabContext>
      

      
    </>}/>
  )
  }else{
    return (
      <Login/>
    )
  }
}


export async function getServerSideProps(context) {

  const [user, ses, perm] = await useAuthProps(context);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      ses: ses,
    },
  }
}