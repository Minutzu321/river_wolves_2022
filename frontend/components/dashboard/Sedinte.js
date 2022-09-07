import React, { useEffect } from 'react'
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Badge from '@mui/material/Badge';

import { styled } from '@mui/material/styles';

import { addOre, intreDate, saptziluna } from '../../libs/data'

import {badgeColor, badgeImg, badgeLabel} from '../../libs/badge';

import {getPerm} from '../../libs/perm';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import { Box, Chip, IconButton, Menu, MenuItem, FormControl, InputLabel, Select, Grid, Typography, Snackbar, Alert, FormControlLabel, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import { NUME_EVENT, publish } from '../../libs/events';
import { ADMIN_PERM } from '../../libs/config';
import Cancel from '@mui/icons-material/Cancel';
import { getParticipanti, getPrezenti, participa, prezent } from '../../libs/participari';





const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Sedinte({user, sedinte}) {

  const curentDep = user.departament==="NEREPARTIZAT"?"TOATE":user.departament;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dep, setDep] = React.useState(curentDep);
  const [checked, setChecked] = React.useState([]);
  const [openMembri, setOpenMembri] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [delSed, setDelSed] = React.useState(false);

  const [addDep, setAddDep] = React.useState(curentDep);
  const [dataOra, setDataOra] = React.useState(new Date());
  const [durata, setDurata] = React.useState(1);
  const [titlu, setTitlu] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [recurent, setRecurent] = React.useState(false);

  const [target, setTarget] = React.useState(undefined)

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");

  React.useEffect(()=>{
    if(!!target){
      sedinte.forEach((s)=>{
        if(s.id == target.id){
          setChecked(getPrezenti(s.participari));
          setTarget(s);
        }
      })
    }
  }, [sedinte])

  

  const open = Boolean(anchorEl);
  const data = new Date();
  const perm = getPerm(user.grad, user.incredere)

  //check recurent
  const handleCheck = (event) => {
    setRecurent(event.target.checked);
  };

  //titlu
  const handleTitlu = (event) => {
    setTitlu(event.target.value);
  };

  //desc
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  //alerta
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

  //add dep
  const handleAddDep = (event) => {
    setAddDep(event.target.value);
  };

  //departament
  const handleDep = (event) => {
    setDep(event.target.value);
  };

    //edit open
  const handleEditOpen = () => {
    setAddDep(target.departament);
    setDataOra(new Date(target.data_ora));
    setDurata(target.durata);
    setTitlu(target.titlu);
    setDesc(target.desc);
    setOpenEdit(true);
  };

  //add open
  const handleAddOpen = () => {
    setAddDep(curentDep);
    setDataOra(new Date());
    setDurata(1);
    setTitlu('');
    setDesc('');
    setRecurent(false);
    setOpenAdd(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleAddSave = () => {
    handleAddClose();
    axios.post('api/dash/addsedinta', {
      dep: addDep,
      dataOra: dataOra,
      rec: recurent,
      durata: durata,
      titlu: titlu,
      desc: desc,
    })
      .then(res => {
        alert("Adaugat cu succes!")
        publish(NUME_EVENT.UPDATE_SEDINTE)
      })
  };

  const handleEditSedintaSave = () => {
    handleEditClose();
    axios.post('api/dash/editsedinta', {
      id: target.id,
      dep: addDep,
      dataOra: dataOra,
      durata: durata,
      titlu: titlu,
      desc: desc,
    })
      .then(res => {
        alert("Salvat cu succes!")
        publish(NUME_EVENT.UPDATE_SEDINTE)
      })
  };

  const handlePrezenteSave = () => {
    handleMembriClose()
    axios.post('api/dash/prezsedinta', {
      prez: checked,
      id: target.id,
    })
      .then(res => {
        alert("Salvat cu succes!")
        publish(NUME_EVENT.UPDATE_SEDINTE)
      })
  };

  const handleDelSedinta = () => {
    handleDelSedClose();
    axios.post('api/dash/delsedinta', {
      id: target.id,
      rec: target.recurenta,
      delrec: recurent,
      data_ora: target.data_ora,
      ref: target.ref
    })
      .then(res => {
        alert("Sters cu succes!")
        publish(NUME_EVENT.UPDATE_SEDINTE)
      })
  };

  //prezenta
  const handlePrezenta = (sedinta) => {

    let anulat  = false,
        prezenta = false;
    
    if(intreDate(new Date(sedinta.data_ora), addOre(sedinta.durata,new Date(sedinta.data_ora)))){
      if(prezent(user.nume, sedinta.participari)){
        prezenta = false;
        anulat = true;
      }else{
        prezenta = true;
        anulat = false;
      }
    }else{
      if(participa(user.nume, sedinta.participari)){
        prezenta = false;
        anulat = true;
      }else{
        prezenta = false;
        anulat = false;
      }
    }

    axios.post('api/dash/participasedinta', {
      id: sedinta.id,
      anulat: anulat,
      prezent: prezenta,
    })
      .then(res => {
        alert("Salvat cu succes!")
        publish(NUME_EVENT.UPDATE_SEDINTE)
      })
  };

  //participanti
  const handleDelSedOpen = () => {
    setDelSed(true);
  };

  //participanti
  const handleDelSedClose = () => {
    setRecurent(false);
    setDelSed(false);
  };

  //participanti
  const handleMembriOpen = () => {
    setOpenMembri(true);
  };

  const handleMembriClose = () => {
    setOpenMembri(false);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  //meniu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
  <>
    <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
    </Snackbar>
    <Dialog
      open={openMembri}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleMembriClose}
      aria-describedby="alert-dialog-slide-description"
    >
      
      <DialogTitle>{"Lista participanti"}</DialogTitle>
      <DialogContent>
        <h5>Participanti: {!!target && getParticipanti(target.participari).length}</h5>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {!!target && target.participari.filter((part)=>!part.anulat).map((parti, index) => {
              const labelId = `checkbox-list-secondary-label-${parti.user.nume}`;
              return (
                  <ListItem
                  key={index}
                  secondaryAction={
                    <>
                      {(perm >= ADMIN_PERM)?<Checkbox
                      edge="end"
                      onChange={handleToggle(parti.user.nume)}
                      checked={checked.indexOf(parti.user.nume) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                      />:checked.indexOf(parti.user.nume) !== -1?<CheckIcon color="success"/>:<CancelIcon color="error"/>
                      }
                    </>
                  }
                  disablePadding
                  >
                  <ListItemButton>
                      <ListItemAvatar>
                      <Avatar
                          alt={parti.user.nume}
                          src={badgeImg(parti.user.departament)}
                      />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={parti.user.nume} />
                  </ListItemButton>
                  </ListItem>
              );
              })}
          </List>
      </DialogContent>
      <DialogActions>
          {(perm>=ADMIN_PERM)&&<Button onClick={handlePrezenteSave} color="success">Salveaza</Button>}
          <Button onClick={handleMembriClose} color="error">Inchide</Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={delSed}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDelSedClose}
      aria-describedby="alert-dialog-slide-description"
    >
      
      <DialogTitle>{"Sterge sedinta"}</DialogTitle>
      <DialogContent>
        <h5>Participanti: {!!target && getParticipanti(target.participari).length}</h5>
        {(!!target && !!target.recurenta) && <FormControlLabel
            control={
              <Switch checked={recurent} onChange={handleCheck} name="recurenta" color="error" />
            }
            label="STERGE SEDINTELE RECURENTE"
          />}
          {recurent&&<Typography className="text-wrap" color='error'>ATENTIE! Se vor sterge toate sedintele recurente care urmeaza dupa sedinta aceasta!</Typography>}
      </DialogContent>
      <DialogActions>
          <Button onClick={handleDelSedinta} color="error">Sterge</Button>
          <Button onClick={handleDelSedClose} color="success">Inchide</Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={openAdd}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleAddClose}
      aria-describedby="alert-dialog-slide-description"
    >
      
      <DialogTitle>{"Adauga sedinta"}</DialogTitle>
      <DialogContent>
        <br/>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-dep">Departament</InputLabel>
            <Select
              labelId="select-dep"
              id="sel-dep"
              value={addDep}
              label="Departament"
              onChange={handleAddDep}
            >
              <MenuItem value={"TOATE"}>TOATE</MenuItem>
              <MenuItem value={"MEDIA"}>MEDIA</MenuItem>
              <MenuItem value={"MECANICA"}>MECANICA</MenuItem>
              <MenuItem value={"DESIGN"}>DESIGN</MenuItem>
              <MenuItem value={"PROGRAMARE"}>PROGRAMARE</MenuItem>
            </Select>
          </FormControl>
          <br/><br/>
          <LocalizationProvider dateAdapter={AdapterLuxon} locale="ro">
            <DateTimePicker
              label="Data si ora"
              renderInput={(params) => <TextField {...params} />}
              value={dataOra}
              onChange={(newValue) => {
                setDataOra(newValue);
              }}
              
            />
          </LocalizationProvider>
          <br/><br/>
          <FormControlLabel
            control={
              <Switch checked={recurent} onChange={handleCheck} name="recurenta" />
            }
            label="Recurent"
          />
          <FormHelperText>Pana in luna iulie</FormHelperText>
          <br/>
          <Typography id="input-slider" gutterBottom>
            Pana la: {addOre(durata, new Date(dataOra)).toTimeString().substring(0, 5)}
          </Typography>
          <Slider min={0.25} step={0.25} max={12} defaultValue={1} value={durata} 
              onChange={(newValue) => {
                setDurata(newValue.target.value)
              }} aria-label="Durata" valueLabelDisplay="auto" />
          <br/><br/>
          <TextField id="titlu" label="Titlu" variant="outlined" value={titlu} onChange={handleTitlu}/>
          <br/><br/>
          <TextField id="desc" label="Descriere" variant="outlined" value={desc} onChange={handleDesc}/>
          
          
        </Box>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleAddSave} color="success">Salveaza</Button>
          <Button onClick={handleAddClose} color="error">Inchide</Button>
      </DialogActions>
    </Dialog>

    <Dialog
      open={openEdit}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleEditClose}
      aria-describedby="alert-dialog-slide-description"
    >
      
      <DialogTitle>{"Editeaza sedinta"}</DialogTitle>
      <DialogContent>
        <br/>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="select-dep">Departament</InputLabel>
            <Select
              labelId="select-dep"
              id="sel-dep"
              value={addDep}
              label="Departament"
              onChange={handleAddDep}
            >
              <MenuItem value={"TOATE"}>TOATE</MenuItem>
              <MenuItem value={"MEDIA"}>MEDIA</MenuItem>
              <MenuItem value={"MECANICA"}>MECANICA</MenuItem>
              <MenuItem value={"DESIGN"}>DESIGN</MenuItem>
              <MenuItem value={"PROGRAMARE"}>PROGRAMARE</MenuItem>
            </Select>
          </FormControl>
          <br/><br/>
          <LocalizationProvider dateAdapter={AdapterLuxon} locale="ro">
            <DateTimePicker
              label="Data si ora"
              renderInput={(params) => <TextField {...params} />}
              value={dataOra}
              onChange={(newValue) => {
                setDataOra(newValue);
              }}
              
            />
          </LocalizationProvider>
          <br/><br/>
          <Typography id="input-slider" gutterBottom>
            Pana la: {addOre(durata, new Date(dataOra)).toTimeString().substring(0, 5)}
          </Typography>
          <Slider min={0.25} step={0.25} max={12} defaultValue={1} value={durata} 
              onChange={(newValue) => {
                setDurata(newValue.target.value)
              }} aria-label="Durata" valueLabelDisplay="auto" />
          <br/><br/>
          <TextField id="titlu" label="Titlu" variant="outlined" value={titlu} onChange={handleTitlu}/>
          <br/><br/>
          <TextField id="desc" label="Descriere" variant="outlined" value={desc} onChange={handleDesc}/>
          
          
        </Box>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleEditSedintaSave} color="success">Salveaza</Button>
          <Button onClick={handleEditClose} color="error">Inchide</Button>
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
      <MenuItem onClick={()=>{handleClose(); handleEditOpen()}}>Editeaza</MenuItem>
      <MenuItem onClick={()=>{handleClose(); handleDelSedOpen()}}>Sterge</MenuItem>
    </Menu>
    

    {(perm >= 45)&&<Box textAlign='center'>
      <Button variant="outlined" color="secondary" startIcon={<AddIcon />} onClick={handleAddOpen}>
        Adauga
      </Button>
    </Box>}
    
    
    <br/>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-dep">Sedinte</InputLabel>
        <Select
          labelId="select-dep"
          id="sel-dep"
          value={dep}
          label="Sedinte"
          onChange={handleDep}
        >
          <MenuItem value={"TOATE"}>TOATE</MenuItem>
          <MenuItem value={"MEDIA"}>MEDIA</MenuItem>
          <MenuItem value={"MECANICA"}>MECANICA</MenuItem>
          <MenuItem value={"DESIGN"}>DESIGN</MenuItem>
          <MenuItem value={"PROGRAMARE"}>PROGRAMARE</MenuItem>
          <MenuItem value={"TRECUTE"}>TRECUTE</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <br/>
    
    <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2 , sm: 8, md: 12 }}>
    {sedinte.filter(sed => dep === "TRECUTE"?addOre(sed.durata+1,new Date(sed.data_ora))<new Date():addOre(sed.durata+1,new Date(sed.data_ora))>=new Date()).filter(sed => sed.departament === "TOATE"?true:(dep==="TOATE" || dep==="TRECUTE")?true:dep===sed.departament).sort(function(a,b){
        return new Date(a.data_ora) - new Date(b.data_ora);
      }).map((sedinta, index) => (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <div className="card">
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={100}
          >
            <Chip variant="outlined" color={badgeColor(sedinta.departament)} label={sedinta.departament} avatar={<Avatar src={badgeImg(sedinta.departament)} />} />
            {(perm >= 45)&&<IconButton
                color="secondary"
                aria-controls={open ? 'edit-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event)=>{setTarget(sedinta); handleClick(event)}}
            >
                <MoreVertIcon color="secondary"/>
            </IconButton>}
          </Box>
            <div className="card-body text-center">
                <h3 className="card-title text-wrap">{sedinta.titlu}</h3>
                <p className="card-title text-wrap">{saptziluna(new Date(sedinta.data_ora))}</p>
                
                <p className="card-text text-wrap">{sedinta.desc}</p>
                
                <hr/>
                <IconButton aria-label="participanti" onClick={()=>{setTarget(sedinta); setChecked(getPrezenti(sedinta.participari)); handleMembriOpen()}}>
                  <StyledBadge badgeContent={getParticipanti(sedinta.participari).length} color="secondary">
                    <PersonIcon />
                  </StyledBadge>
                </IconButton>
                <Button variant="outlined" color="secondary" onClick={()=>{handlePrezenta(sedinta)}}>{intreDate(new Date(sedinta.data_ora), addOre(sedinta.durata,new Date(sedinta.data_ora)))?prezent(user.nume, sedinta.participari)?"Anuleaza":"Prezent":participa(user.nume, sedinta.participari)?"Anuleaza":"Participa"}</Button>
            </div>
            <div className="card-footer text-muted text-center">
            {new Date(sedinta.data_ora).toTimeString().substring(0, 5)}-{addOre(sedinta.durata,new Date(sedinta.data_ora)).toTimeString().substring(0, 5)}
            </div>
        </div>
      </Grid>
    ))}
    </Grid>
  </>
  )
}

export default Sedinte