import {TextField, Alert, Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, Select, Slide, Snackbar, Typography } from '@mui/material';
import React from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import {zilunaan} from '../../libs/data';
import {getPerm} from '../../libs/perm';
import {badgeColor, badgeImg, badgeLabel} from '../../libs/badge';
import axios from 'axios';
import { NUME_EVENT, publish } from '../../libs/events';

import { SPONSOR_PERM, MEMBRU_PERM, ALUMNI_PERM, PARTENER_PERM, MENTOR_PERM, BOARD_PERM, TEAM_LEADER_PERM } from '../../libs/config';
import { getUserPrezente } from '../../libs/participari';

import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import MoodIcon from '@mui/icons-material/Mood';
import Mood from '@mui/icons-material/Mood';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function Useri({user, membri, sedinte}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  

  const [target, setTarget] = React.useState(undefined);

  const [grad, setGrad] = React.useState("NEAPROBAT");
  const [dep, setDep] = React.useState("NEREPARTIZAT");

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openSterge, setOpenSterge] = React.useState(false);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

  const [perm, setPerm] = React.useState(0);

  const [userInfo, setUserInfo] = React.useState({});

  const [medie, setMedie] = React.useState(0);

  const [nume, setNume] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [dataNaterii, setDataNaterii] = React.useState(new Date());


  const [membriFin, setMembriFin] = React.useState([]);

  function clean(d, trim=true){
    if(trim){
      d = d.trim();
    }
    while(d.includes("  ")){
      d = d.replace("  ", " ");
    }
    return d
  }

  React.useEffect(()=>{
    let p = getPerm(user.grad, user.incredere)
    setPerm(p);



    setUserInfo({
      nume: user.nume,
      email: user.email,
      telefon: user.telefon,
      badgeColor: badgeColor(user.departament),
      badgeLabel: badgeLabel(user.grad),
      badgeImg: badgeImg(user.departament),
      prezente: getUserPrezente(user, sedinte),
      nastere: zilunaan(new Date(user.data_nasterii))
    })
  },[user, sedinte])

  React.useEffect(()=>{
    let max = 0;
    let min = 100;
    let med = 0;
    let m = membri.filter(me => me.grad !== "IGNORAT")
                  .sort(function(a,b){
                      return getUserPrezente(b, sedinte)/(getPerm(b.grad, b.incredere)*100)-getUserPrezente(a, sedinte)/(getPerm(a.grad, a.incredere)*100)
                  }).map((mm) => {
          let prezentamembru = getUserPrezente(mm, sedinte);
          if(prezentamembru > max){
            max = prezentamembru
          }
          if(prezentamembru < min){
            min = prezentamembru
          }
          return {
              ...mm,
              badgeColor: badgeColor(mm.departament),
              badgeLabel: badgeLabel(mm.grad),
              badgeImg: badgeImg(mm.departament),
              mperm: getPerm(mm.grad, mm.incredere),
              prezente: prezentamembru,
              nastere: zilunaan(new Date(mm.data_nasterii)),
          }
      });;

    setMembriFin(m);

    med = (min+max)/2
    setMedie(med)
  },[membri,sedinte])


  const alert = (msg) => {
    setAlertMsg(msg);
    handleClickAlert();
  }

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleStergeOpen = () => {
    setOpenSterge(true);
  };

  const handleStergeClose = () => {
    setOpenSterge(false);
  };

  const handleGrad = (event) => {
    setGrad(event.target.value);
  };

  const handleDep = (event) => {
    setDep(event.target.value);
  };

  const saveUser = () => {
    handleEditClose();
    axios.post('api/dash/edituser', {
      target: target.email,
      grad: grad,
      dep: dep,
      nume: nume,
      tel: tel,
      dat: dataNaterii,
    })
      .then(res => {
        alert("Salvat cu succes!")
        publish(NUME_EVENT.UPDATE_MEMBRI)
      })
  };

  const delUser = () => {
    handleStergeClose();
    axios.post('api/dash/deluser', {
      target: target.email,
    })
      .then(res => {
        alert("User sters cu succes!")
        publish(NUME_EVENT.UPDATE_MEMBRI)
      })
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <Dialog
            open={openEdit}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEditClose}
            aria-describedby="alert-dialog-slide-description"
        >
            
            <DialogTitle>{"Editeaza userul"}</DialogTitle>
            <DialogContent>
                {!!target&&<>
                  <p className="text-wrap h5">Schimba gradul sau departamentul userului <b>{target.nume}</b></p>
                <br/>
                  <FormControl fullWidth>
                    <InputLabel id="grad-de-selectat">Grad</InputLabel>
                    <Select
                      labelId="grad-de-selectat"
                      id="selecteazaGrad"
                      value={grad}
                      label="Grad"
                      onChange={handleGrad}
                      component="span"
                    >
                      <MenuItem value={"NEAPROBAT"} component="span" disable>NEAPROBAT</MenuItem>
                      <MenuItem value={"VOLUNTAR"} component="span">VOLUNTAR</MenuItem>
                      {(perm > SPONSOR_PERM) &&<MenuItem value={"SPONSOR"} component="span">SPONSOR</MenuItem>}
                      {(perm > MEMBRU_PERM) &&<MenuItem value={"MEMBRU"} component="span">MEMBRU</MenuItem>}
                      {(perm > ALUMNI_PERM) &&<MenuItem value={"ALUMNI"} component="span">ALUMNI</MenuItem>}
                      {(perm > PARTENER_PERM) &&<MenuItem value={"PARTENER"} component="span">PARTENER</MenuItem>}
                      {(perm > MENTOR_PERM) &&<MenuItem value={"MENTOR"} component="span">MENTOR</MenuItem>}
                      {(perm > BOARD_PERM) &&<MenuItem value={"BOARD"} component="span">BOARD</MenuItem>}
                      {(perm >= TEAM_LEADER_PERM) &&<MenuItem value={"TEAM_LEADER"} component="span">TEAM LEADER</MenuItem>}
                    </Select>
                    <hr/>
                    </FormControl>
                    <FormControl fullWidth>
                    <InputLabel id="dep-de-selectat">Departament</InputLabel>
                    <Select
                      labelId="dep-de-selectat"
                      id="selecteazaDep"
                      value={dep}
                      label="Departament"
                      onChange={handleDep}
                      component="spand"
                    >
                      <MenuItem value={"NEREPARTIZAT"} component="span">NEREPARTIZAT</MenuItem>
                      <MenuItem value={"MECANICA"} component="span">MECANICA</MenuItem>
                      <MenuItem value={"PROGRAMARE"} component="span">PROGRAMARE</MenuItem>
                      <MenuItem value={"DESIGN"} component="span">DESIGN</MenuItem>
                      <MenuItem value={"MEDIA"} component="span">MEDIA</MenuItem>
                    </Select>
                    {(perm >= TEAM_LEADER_PERM) &&<>
                    <br/>
                    <TextField
                      color ="secondary"
                      id="numele" 
                      label="Nume" 
                      variant="outlined"
                      value={nume} 
                      onChange={(event) => {
                            setNume(clean(event.target.value, false));
                          }}/>
                          <br/>
                    <TextField
                      color="secondary"
                      id="tel"
                      label="Telefon"
                      variant="outlined"
                      value={tel}
                      onChange={(event) => {
                            setTel(event.target.value);
                          }}/>
                          <br/>
                      <LocalizationProvider dateAdapter={AdapterLuxon} locale="ro">
                        <DatePicker
                          
                          disableFuture
                          label="Data nașterii"
                          openTo="year"
                          views={['year', 'month', 'day']}
                          value={dataNaterii}
                          onChange={(newValue) => {
                            setDataNaterii(newValue);
                          }}
                          renderInput={(params) => <TextField variant="outlined" {...params} color="secondary"/>}
                        />
                    </LocalizationProvider>
                    </>}
                  </FormControl>
                </>}
            </DialogContent>
            <DialogActions>
              <Button onClick={saveUser} color="success"><CheckIcon/>Salveaza</Button>
                <Button onClick={handleEditClose} color="error"><ArrowBackOutlinedIcon/>Inapoi</Button>
            </DialogActions>
      </Dialog>
      <Dialog
            open={openSterge}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleStergeClose}
            aria-describedby="alert-dialog-slide-description"
        >
            
            <DialogTitle>{"Esti sigur?"}</DialogTitle>
            <DialogContent>
                {!!target&&<>
                  <p className="text-wrap h5">Actiunea va sterge toate datele pentru contul <b>{target.nume}</b></p>
                </>}
            </DialogContent>
            <DialogActions>
                <Button onClick={delUser} color="error"><DeleteForeverOutlinedIcon/>Sterge</Button>
                <Button onClick={handleStergeClose} color="success"><ArrowBackOutlinedIcon/>Inapoi</Button>
            </DialogActions>
      </Dialog>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{handleClose(); handleEditOpen();}}><EditOutlinedIcon color="info"/>Editeaza</MenuItem>
        <MenuItem onClick={()=>{handleClose(); handleStergeOpen();}}><DeleteForeverOutlinedIcon color="error"/>Sterge</MenuItem>
      </Menu>
      {userInfo.nume&&<div className="card">
        <div className="card-header text-center">
          <br/>
          <Chip variant="outlined" color={userInfo.badgeColor} label={userInfo.badgeLabel} avatar={<Avatar src={userInfo.badgeImg} />} />
            
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{userInfo.nume}</h5>
          <p className="card-title text-wrap">{userInfo.nastere}</p>
          <p className="card-title text-wrap">{userInfo.email}</p>
          <p className="card-title text-wrap">{userInfo.telefon}</p>
          <h6 className="card-title text-wrap">Prezenta: {(userInfo.prezente <= medie+10 && userInfo.prezente >= medie-10) ? <Typography variant="h6" style={{color: 'orange'}}><SentimentNeutralIcon/>{userInfo.prezente}%</Typography>:(userInfo.prezente < medie-10)?<Typography variant="h6" style={{color: 'red'}}><SentimentVeryDissatisfiedIcon/>{userInfo.prezente}%</Typography>:<Typography variant="h6" style={{color: 'green'}}><Mood/>{userInfo.prezente}%</Typography>}</h6>
        </div>
      </div>}
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2 , sm: 8, md: 12 }}>
        {membriFin.map((membru, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <div className="card">
            <div className="card-header text-center">
            <Box
              component="span"
              m={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Chip variant="outlined" color={membru.badgeColor} label={membru.badgeLabel} avatar={<Avatar src={membru.badgeImg} />} />
              {((perm >= 45)&&(perm > membru.mperm))&&<IconButton
                  color="secondary"
                  aria-controls={open ? 'edit-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(event)=>{setTarget(membru); setNume(membru.nume); setDataNaterii(new Date(membru.data_nasterii)); setTel(membru.telefon); setGrad(membru.grad); setDep(membru.departament); handleClick(event);}}
              >
                  <MoreVertIcon color="secondary"/>
              </IconButton>}
            </Box>
              
            </div>
            <div className="card-body text-center">
                <h5 className="card-title">{membru.nume}</h5>
                <p className="card-title text-wrap">{membru.nastere}</p>
                <p className="card-title text-wrap">{membru.email}</p>
                <p className="card-title text-wrap">{membru.telefon}</p>
                <h6 className="card-title text-wrap">Prezenta: {(membru.prezente <= medie+10 && membru.prezente >= medie-10) ? <Typography variant="h6" style={{color: 'orange'}}><SentimentNeutralIcon/>{membru.prezente}%</Typography>:(membru.prezente < medie-10)?<Typography variant="h6" style={{color: 'red'}}><SentimentVeryDissatisfiedIcon/>{membru.prezente}%</Typography>:<Typography variant="h6" style={{color: 'green'}}><Mood/>{membru.prezente}%</Typography>}</h6>
            </div>
          </div>
        </Grid>
        ))}
      </Grid>
    </>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
