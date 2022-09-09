import React, { useEffect, useState } from 'react'



import { useInterval } from 'usehooks-ts'

import { saptziluna } from '../../libs/data';
import { publish } from '../../libs/events';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GroupsIcon from '@mui/icons-material/Groups';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function Rezumat({membri, sedinte, taskuri}) {

    const [salut, setSalut] = useState("");
    const [dat, setDat] = useState("");

    const [aproba, setAproba] = useState(0);
    const [taskuriAzi, setTaskuriAzi] = useState(0);
    const [sedinteAzi, setSedinteAzi] = useState(0);

    // useEffect

    

    const buttons = [
      <Button key="Sedinte" onClick={()=>{publish("scrollSedinte")}}><FormatListBulletedIcon/>Sedinte</Button>,
      <Button key="Taskuri" onClick={()=>{publish("scrollTaskuri")}}><TaskAltIcon/>Taskuri</Button>,
      <Button key="Membri" onClick={()=>{publish("scrollMembri")}}><GroupsIcon/>Membri</Button>,
    ];

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

  return (
    <div className="card text-center">
        <div className="card-header mt-2">
            {salut}
        </div>
        <div className="card-body">
            <h4 className="card-title">Rezumatul zilei de azi</h4>
            <p className="card-text">3 sedinte, 8 taskuri de indeplinit in total</p>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                  m: 1,
                },
              }}
            >

              <ButtonGroup color="secondary" size="small" aria-label="small button group">
                {buttons}
              </ButtonGroup>
            </Box>
        </div>
        <div className="card-footer text-muted mb-2">
            {dat}
        </div>
    </div>
  )
}
