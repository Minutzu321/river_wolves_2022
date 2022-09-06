import React from 'react'
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

import { saptziluna } from '../../libs/data'

import {badgeColor, badgeImg, badgeLabel} from '../../libs/badge';

import {getPerm} from '../../libs/perm';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import { Box, Chip, IconButton, Menu, MenuItem, FormControl, InputLabel, Select, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';





const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Sedinte({user}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dep, setDep] = React.useState('TOATE');
  const [checked, setChecked] = React.useState([]);
  const [openMembri, setOpenMembri] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const [addDep, setAddDep] = React.useState('TOATE');
  const [dataOra, setDataOra] = React.useState(new Date());
  const [durata, setDurata] = React.useState(1);

  const open = Boolean(anchorEl);
  const data = new Date();
  const perm = getPerm(user.grad, user.incredere)

  //add dep
  const handleAddDep = (event) => {
    setAddDep(event.target.value);
  };

  //departament
  const handleDep = (event) => {
    setDep(event.target.value);
  };

  //add
  const handleAddOpen = () => {
    setOpenAdd(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
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
    <Dialog
      open={openMembri}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleMembriClose}
      aria-describedby="alert-dialog-slide-description"
    >
      
      <DialogTitle>{"Lista participanti"}</DialogTitle>
      <DialogContent>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {["aurel", "mani", "tani", "veni"].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                  <ListItem
                  key={value}
                  secondaryAction={
                      <Checkbox
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                      />
                  }
                  disablePadding
                  >
                  <ListItemButton>
                      <ListItemAvatar>
                      <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src={`https://mui.com/static/images/avatar/1.jpg`}
                      />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={value} />
                  </ListItemButton>
                  </ListItem>
              );
              })}
          </List>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleMembriClose} color="error">Inchide</Button>
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
          <Typography id="input-slider" gutterBottom>
            Durata(ore): {durata}
          </Typography>
          <Slider min={1} step={0.25} max={12} defaultValue={1} value={durata} 
              onChange={(newValue) => {
                setDurata(newValue.target.value)
              }} aria-label="Durata" valueLabelDisplay="auto" />
          <br/><br/>
          <TextField id="titlu" label="Titlu" variant="outlined" />
          <br/><br/>
          <TextField id="desc" label="Descriere" variant="outlined" />
          
          
        </Box>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleAddClose} color="success">Salveaza</Button>
          <Button onClick={handleAddClose} color="error">Inchide</Button>
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
      <MenuItem onClick={()=>{handleClose(); handleMembriOpen()}}>Participanti</MenuItem>
      <MenuItem onClick={handleClose}>Editeaza</MenuItem>
      <MenuItem onClick={handleClose}>Sterge</MenuItem>
    </Menu>
    

    {(perm >= 45)&&<Box textAlign='center'>
      <Button variant="outlined" color="secondary" startIcon={<AddIcon />} onClick={handleAddOpen}>
        Adauga
      </Button>
    </Box>}
    
    
    <br/>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-dep">Departament</InputLabel>
        <Select
          labelId="select-dep"
          id="sel-dep"
          value={dep}
          label="Departament"
          onChange={handleDep}
        >
          <MenuItem value={"TOATE"}>TOATE</MenuItem>
          <MenuItem value={"MEDIA"}>MEDIA</MenuItem>
          <MenuItem value={"MECANICA"}>MECANICA</MenuItem>
          <MenuItem value={"DESIGN"}>DESIGN</MenuItem>
          <MenuItem value={"PROGRAMARE"}>PROGRAMARE</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <br/>
    
    <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 2 , sm: 8, md: 12 }}>
      <Grid item xs={2} sm={4} md={4} key={1}>
        <div className="card">
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={100}
          >
            <Chip variant="outlined" color={badgeColor("MEDIA")} label={"MEDIA"} avatar={<Avatar src={badgeImg("MEDIA")} />} />
            {(perm >= 45)&&<IconButton
                color="secondary"
                aria-controls={open ? 'edit-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event)=>{handleClick(event)}}
            >
                <MoreVertIcon color="secondary"/>
            </IconButton>}
          </Box>
            <div className="card-body text-center">
                <h4 className="card-title">{saptziluna(data)}</h4>
                <p className="card-text">test test test test test</p>
                <a href="#" className="btn btn-primary">Participa</a>
            </div>
        </div>
      </Grid>
    </Grid>
  </>
  )
}

export default Sedinte