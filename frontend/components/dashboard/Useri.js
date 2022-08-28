import { Alert, Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, Select, Slide, Snackbar } from '@mui/material';
import React, { useEffect } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import {zilunaan} from '../../libs/data';
import {getPerm} from '../../libs/perm';
import {badgeColor, badgeImg, badgeLabel} from '../../libs/badge';
import axios from 'axios';

export default function Useri({user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [membri, setMembri] = React.useState([]);

  const [target, setTarget] = React.useState(undefined);

  const [grad, setGrad] = React.useState("NEAPROBAT");
  const [dep, setDep] = React.useState("NEREPARTIZAT");

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openSterge, setOpenSterge] = React.useState(false);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");


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
    })
      .then(res => {
        alert("Salvat cu succes!")
        useMembri();
      })
  };
  

  function useMembri(){
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
    useMembri();
  }, [])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const perm = getPerm(user.grad, user.incredere)
  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
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
                      {(perm > 20) &&<MenuItem value={"SPONSOR"} component="span">SPONSOR</MenuItem>}
                      {(perm > 30) &&<MenuItem value={"MEMBRU"} component="span">MEMBRU</MenuItem>}
                      {(perm > 30) &&<MenuItem value={"ALUMNI"} component="span">ALUMNI</MenuItem>}
                      {(perm > 30) &&<MenuItem value={"PARTENER"} component="span">PARTENER</MenuItem>}
                      {(perm > 40) &&<MenuItem value={"MENTOR"} component="span">MENTOR</MenuItem>}
                      {(perm > 50) &&<MenuItem value={"BOARD"} component="span">BOARD</MenuItem>}
                      {(perm >= 60) &&<MenuItem value={"TEAM_LEADER"} component="span">TEAM LEADER</MenuItem>}
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
                  </FormControl>
                </>}
            </DialogContent>
            <DialogActions>
              <Button onClick={saveUser} color="success">Salveaza</Button>
                <Button onClick={handleEditClose} color="error">Inchide</Button>
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
                <Button onClick={handleStergeClose} color="error">Sterge</Button>
                <Button onClick={handleStergeClose} color="success">Anuleaza</Button>
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
        <MenuItem onClick={()=>{handleClose(); handleEditOpen();}}>Editeaza</MenuItem>
        <MenuItem onClick={()=>{handleClose(); handleStergeOpen();}}>Sterge</MenuItem>
      </Menu>
      <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2 , sm: 8, md: 12 }}>
        {membri.map((membru, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <div className="card">
            <div className="card-header text-center">
            <Box
              component="span"
              m={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={100}
            >
              <Chip variant="outlined" color={badgeColor(membru.departament)} label={badgeLabel(membru.grad)} avatar={<Avatar src={badgeImg(membru.departament)} />} />
              {((perm > 45)&&(perm > getPerm(membru.grad, membru.incredere)))&&<IconButton
                  color="secondary"
                  aria-controls={open ? 'edit-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(event)=>{setTarget(membru); setGrad(membru.grad); setDep(membru.departament); handleClick(event);}}
              >
                  <MoreVertIcon color="secondary"/>
              </IconButton>}
            </Box>
              
            </div>
            <div className="card-body text-center">
                <h4 className="card-title">{membru.nume}</h4>
                <br/>
                <footer className="blockquote-footer">{zilunaan(new Date(membru.data_nasterii))}</footer>
                <footer className="blockquote-footer">{membru.email}</footer>
                <footer className="blockquote-footer">{membru.telefon}</footer>
                <footer className="blockquote-footer">{membru.participari.length}</footer>
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
