

import { styled } from '@mui/material/styles';
import axios from 'axios';

import { useEffectOnce } from 'usehooks-ts'
import { useSession, signIn, getSession} from "next-auth/react"
import { useState } from 'react';

import { serv } from '../../utils/server';


import FeedbackSedinta from '../../components/dashboard/FeedbackSedinta';
import Firmituri from '../../components/dashboard/Firmituri';
import Login from '../../components/dashboard/Login';
import Rezumat from '../../components/dashboard/Rezumat';
import Matrita from '../../components/dashboard/Matrita';


export default function Dash() {

  const {data: session} = useSession()

  const [load, setLoad] = useState(true)

  const [autorizat, setAutorizat] = useState(false)
  const [infos, setInfos] = useState(false)
  const [err, setErr] = useState(false)

  const [user, setUser] = useState({})
  const [sedinte, setSedinte] = useState([])
  const [taskuri, setTaskuri] = useState([])

  function useAutorizare(){
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

  useEffectOnce(() => {
    useAutorizare();
  })

  
  
  if (session) {
  return (
    <Matrita err={err} load={load} autorizat={autorizat} infos={infos} comp={<>
      <Firmituri/>    
      <Rezumat/>
      <br/>
      <FeedbackSedinta/>
    </>}/>
  )
  }else{
    return (
      <Login/>
    )
  }
}