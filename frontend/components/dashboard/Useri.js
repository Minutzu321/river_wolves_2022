import { Avatar, Chip, Grid } from '@mui/material';
import React from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { saptziluna } from '../../utils/data';

export default function Useri() {
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
    <>
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
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4 , sm: 8, md: 12 }}>
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <div className="card">
        
        
        <div className="card-header mt-2 text-center">
            
            <Chip variant="outlined" color="warning" label="Design" avatar={<Avatar src="/planetute/design.png" />} />
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
            <h4 className="card-title">Chirus Mina-Sebastian</h4>
            <p className="card-text">test test test test test</p>
            <a href="#" className="btn btn-primary">Click</a>
        </div>
    </div>
                </Grid>
              ))}
            </Grid>
            </>
  )
}
