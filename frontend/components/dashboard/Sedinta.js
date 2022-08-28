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

import { saptziluna } from '../../libs/data'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';





function Sedinta() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  



  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = new Date();
  return (
    <div className="card">
        
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
        <div className="card-header mt-2 text-center">
            {saptziluna(data)}
            <IconButton
                sx={{ justifyContent: "right" }}
                color="secondary"
                aria-controls={open ? 'edit-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
             >
                <MoreVertIcon color="secondary"/>
            </IconButton>
        </div>
        <div className="card-body">
            <h4 className="card-title">Test</h4>
            <p className="card-text">test test test test test</p>
            <a href="#" className="btn btn-primary">Click</a>
        </div>
    </div>
  )
}

export default Sedinta