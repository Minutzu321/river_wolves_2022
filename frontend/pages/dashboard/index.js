

import { styled } from '@mui/material/styles';
import axios from 'axios';

import { useEventListener, useInterval } from 'usehooks-ts'
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from 'react';

import FeedbackSedinta from '../../components/dashboard/FeedbackSedinta';
import Firmituri from '../../components/dashboard/Firmituri';
import Login from '../../components/dashboard/Login';
import Rezumat from '../../components/dashboard/Rezumat';
import Matrita from '../../components/dashboard/Matrita';
import { subscribe, unsubscribe, publish, NUME_EVENT } from '../../libs/events';
import {authProps } from '../../libs/autorizare';
import Useri from '../../components/dashboard/Useri';
import Sedinte from '../../components/dashboard/Sedinte';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getPrezente } from '../../libs/participari';

export default function Dash({pageProps}) {

  // const documentRef = useRef<Document>(document)

  const scrollTo = useRef(undefined);

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

  const [isFeedback, setIsFeedback] = useState(false);

  const executeScroll = () => scrollTo.current.scrollIntoView() 

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  useEventListener("scrollSedinte", () => {
    executeScroll();
    setTab("1");
  })

  useEventListener("scrollTaskuri", () => {
    executeScroll();
    setTab("2");
  })

  useEventListener("scrollMembri", () => {
    executeScroll();
    setTab("4");
  })

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

    //EVENT PROPAGATION
    useEventListener(NUME_EVENT.UPDATE_MEMBRI, () => {
      sendMessage(NUME_EVENT.UPDATE_MEMBRI);
      fetchMembri();
    })
    useEventListener(NUME_EVENT.UPDATE_SEDINTE, () => {
      sendMessage(NUME_EVENT.UPDATE_SEDINTE);
      fetchSedinte();
      fetchMembri();
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
            fetchMembri();
          case NUME_EVENT.UPDATE_SEDINTE:
            fetchSedinte();
            fetchMembri();
        }
      }
    }, [lastMessage]);

    

  function autorizeaza(){
    axios.post('api/dash/auth')
      .then(res => {
        const data = res.data
        setErr(data.err);
        if(!data.err){
          
          setLoad(false);
          setInfos(data.inf)
          setAutorizat(data.aut)
          setTaskuri(data.taskuri)
          setUser(data.user)
        }
      })
  }

  function fetchSedinte(){
    axios.post('api/dash/sedinte')
      .then(res => {
        const data = res.data
        if(!data.err){
          setSedinte(data.sedinte);
        }
      })
  }

  function fetchMembri(){
    axios.post('api/dash/membri')
      .then(res => {
        const data = res.data
        if(!data.err){
          setMembri(data.membri);
        }
      })
  }

  const base_load = () =>{
    autorizeaza();
    fetchMembri();
    fetchSedinte();
  }

  useEffect(() => {
    if(readyState === ReadyState.OPEN){
      base_load();
    }else{
      setLoad(true);
    }
  }, [readyState])

  useEffect(() => {
    if(!!user.participari){
      
      let prezs = Math.floor(getPrezente(user, sedinte)/2);
      let feeds = user.feedbackSedinte.length;
      console.log(feeds, prezs);
      if(prezs > feeds){
        setIsFeedback(true)
      }else{
        setIsFeedback(false)
      }
    }

  }, [user, sedinte])
  
  if (!!pageProps.ses) {
  return (
    <Matrita user={user} err={err} load={load} autorizat={autorizat} infos={infos} comp={<>
      <Firmituri/>    
      <br/>
      {user && <Rezumat membri={membri} taskuri={taskuri} sedinte={sedinte} perm={pageProps.perm} dep={user.departament}/>}
      <br/>
      {isFeedback&&<FeedbackSedinta/>}

      <div ref={scrollTo}>
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
              {/* <Tab label="Treasurehunt" value="3" /> */}
              <Tab label="Membri" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Sedinte user={user} sedinte={sedinte}/>
          </TabPanel>
          <TabPanel value="2">

          </TabPanel>
          {/* <TabPanel value="3">
            <p>Va urma</p>
          </TabPanel> */}
          <TabPanel value="4">
            <Useri user={user} membri={membri} sedinte={sedinte}/>
          </TabPanel>
        </TabContext>
      </div>

      
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