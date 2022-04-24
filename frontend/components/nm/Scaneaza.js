import React, { forwardRef, useState } from 'react'
import { QrReader } from 'react-qr-reader';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Scaneaza({ handleResult }) {
    const [scaneaza, setScaneaza] = useState(false);
    


  return (
    <>
        <button onClick={() => setScaneaza(!scaneaza)}>Scaneaza</button>
      <Dialog
        fullScreen
        open={scaneaza}
        onClose={()=>setScaneaza(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} style={{ background: '#640d53' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setScaneaza(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Scanează codul
            </Typography>
          </Toolbar>
        </AppBar>
        <br/>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              Îndreptați camera spre ecranul voluntarului de la stand.
        </Typography>
        {scaneaza && <QrReader
                    facingMode="environment"
                    delay={5000}
                    onResult={(result)=>{handleResult(result)}}
                    containerStyle={{ maxWidth: "500px", heigth: "100px", marginTop: '0px'}}
                  />}
      </Dialog>
    </>
  )
}
