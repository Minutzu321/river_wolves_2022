import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function getPerm(grad){
  switch(grad) {
    case "VOLUNTAR":
      return 20;
    case "SPONSOR":
      return 10;
    case "MEMBRU":
      return 30;
    case "PARTENER":
      return 40;
    case "MENTOR":
        return 50;
    case "BOARD":
        return 60
    case "TEAM_LEADER_TEHNIC":
        return 70;
    case "TEAM_LEADER_NON_TEHNIC":
      return 70;
    case "TEAM_LEADER":
      return 70;
    case "MINA":
      return 100;
    default:
      return 0;
  }
}

function sort_membri(a, b){
  if(getPerm(a.grad) > getPerm(b.grad))
      return -1;
  if(getPerm(a.grad) < getPerm(b.grad))
      return 1;
  return 0;
}

export default function AdminUseri({userData}) {

  const [useri, setUseri]= useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [target, setTarget] = useState({nume: "cineva"});
  const [grad, setGrad] = useState("NEAPROBAT");

  const [openRez, setOpenRez] = useState(false);
  const [titlu, setTitlu] = useState("");
  const [mesaj, setMesaj] = useState("");

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const fetchUseri = () => {
    fetch('/api/membri/membri_api', {
      method: 'POST',
    }).then((raspuns) => {
      raspuns.json().then((rasp)=> setUseri(rasp.useri))
    });
  }

  useEffect(()=> {
    fetchUseri();
  }, [])

  const editeaza = (cine) => {
    setTarget(cine)
    setGrad(cine.grad)
    setOpenEdit(true)
  }

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleChange = (event) => {
    setGrad(event.target.value);
  };

  const handleSave = (event) => {
    setOpenEdit(false);
    fetch('/api/membri/grad_api', {
      method: 'POST',
      body: JSON.stringify({
        'grad': grad,
        'targetEmail': target.email
      })
    }).then((raspuns) => {
      if(raspuns.ok){
        setMesaj("Schimarile au fost salvate! A fost setat gradul "+grad+" lui "+target.nume)
        setTitlu("Salvat!")
        setOpenRez(true)
        fetchUseri();
      }else{
        setMesaj("A aparut o eroare la conexiunea cu serverul! Incearca mai tarziu!")
        setTitlu("Eroare!")
        setOpenRez(true)
      }
    });
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSnackOpen(false);
  };

  const snack = (mesaj) => {
    setSnackMessage(mesaj);
    setSnackOpen(true);
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

  return (
    <>
      <h2>Admin useri</h2>
      <h5>{useri.length} persoane</h5>
      <button className='btn btn-primary btn-round' onClick={()=>{fetchUseri(); snack("Useri reincarcati!");}}>
          <i className='now-ui-icons arrows-1_refresh-69'></i>
          Refresh
      </button>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message={snackMessage}
        action={action}
      />
      <div>
        <Dialog
          open={openRez}
          onClose={()=> setOpenRez(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {titlu}
          </DialogTitle>
          <DialogContent>
            <br/>
            <DialogContentText id="alert-dialog-description">
              {mesaj}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> setOpenRez(false)}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={openEdit}
          onClose={handleClose}
          aria-labelledby="grad-titlu"
          aria-describedby="grad-descriere"
        >
          <DialogTitle id="grad-titlu">
            {target.nume}
          </DialogTitle>
          <DialogContent>
            <br/>
            <DialogContentText id="grad-descriere">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="grad-de-selectat">Grad</InputLabel>
                <Select
                  labelId="grad-de-selectat"
                  id="selecteaza"
                  value={grad}
                  label="Grad"
                  onChange={handleChange}
                  component="span"
                >
                  <MenuItem value={"NEAPROBAT"} component="span">NEAPROBAT</MenuItem>
                  <MenuItem value={"VOLUNTAR"} component="span">VOLUNTAR</MenuItem>
                  <MenuItem value={"SPONSOR"} component="span">SPONSOR</MenuItem>
                  <MenuItem value={"MEMBRU"} component="span">MEMBRU</MenuItem>
                  <MenuItem value={"PARTENER"} component="span">PARTENER</MenuItem>
                  <MenuItem value={"MENTOR"} component="span">MENTOR</MenuItem>
                  <MenuItem value={"BOARD"} component="span">BOARD</MenuItem>
                </Select>
              </FormControl>
            </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">Anulează</Button>
            <Button onClick={handleSave} autoFocus color="success">
              Salvează
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="row">
            {
                useri.sort((a, b) => sort_membri(a, b)).map((membru, index) => (
                    <div className="col-md-6 ml-auto col-xl-3 mr-auto" key={index}>
                        <div className="card card-body">
                            <h3 className="card-title">{membru.nume}</h3>
                            <h5 className="card-text"><b>Rol: </b>{membru.grad}</h5>
                            <h5 className="card-text"><b>Email: </b>{membru.email}</h5>
                            <h5 className="card-text"><b>Data nasterii: </b>{new Date(membru.data_nasterii).toLocaleDateString("ro")}</h5>
                            {membru.telefon == undefined ? "":<h5 className="card-text"><b>Telefon: </b>{membru.telefon}</h5>}
                            {getPerm(membru.grad) < getPerm(userData.grad) ? <button className="btn btn-primary btn-icon btn-round" type="button" onClick={()=>editeaza(membru)}>
                              <i className="now-ui-icons loader_gear"></i>
                            </button>:""}
                        </div>
                    </div>
                ))
            }
        </div>
        <button className='btn btn-primary btn-round' onClick={()=>{fetchUseri(); snack("Useri reincarcati!");}}>
          <i className='now-ui-icons arrows-1_refresh-69'></i>
          Refresh
      </button>
    </>
  )
}
