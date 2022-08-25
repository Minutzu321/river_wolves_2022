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

import { saptziluna } from '../../utils/data'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';


function ListaMembri() {
    const [checked, setChecked] = React.useState([1]);
  
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
  
    return (
    <DialogContent>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17].map((value) => {
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
                <ListItemText id={labelId} primary={`${value + 1}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </DialogContent>
    );
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function Sedinta() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMembri, setOpenMembri] = React.useState(false);

  const handleMembriOpen = () => {
    setOpenMembri(true);
  };

  const handleMembriClose = () => {
    setOpenMembri(false);
  };



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
        <Dialog
            open={openMembri}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleMembriClose}
            aria-describedby="alert-dialog-slide-description"
        >
            
            <DialogTitle>{"Lista participanti"}</DialogTitle>
            <ListaMembri/>
            
            <DialogActions>
                <Button onClick={handleMembriClose} color="error">Inchide</Button>
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