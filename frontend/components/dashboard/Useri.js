import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide } from '@mui/material';
import React, { useEffect } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import {zilunaan } from '../../libs/data';
import {badgeColor, badgeImg, badgeLabel} from '../../libs/badge';
import axios from 'axios';

export default function Useri() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [membri, setMembri] = React.useState([]);

  const [target, setTarget] = React.useState(undefined);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openSterge, setOpenSterge] = React.useState(false);

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
  

  function useMembri(){
    axios.post('api/dash/membri')
      .then(res => {
        const data = res.data
        if(!data.err){
          setMembri(data.membri);
          console.log(data.membri);
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

  const data = new Date();
  return (
    <>
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
                  {target.nume}
                </>}
            </DialogContent>
            <DialogActions>
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
              <div className='overflow-auto'>
                
                {!!target&&<>
                  <p className="text-wrap h5">Actiunea va sterge toate datele pentru contul <b>{target.nume}</b></p>
                </>}
              </div>
              
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
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4 , sm: 8, md: 12 }}>
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
              <IconButton
                  color="secondary"
                  aria-controls={open ? 'edit-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(event)=>{setTarget(membru); handleClick(event);}}
              >
                  <MoreVertIcon color="secondary"/>
              </IconButton>
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
