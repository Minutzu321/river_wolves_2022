import {forwardRef, React, useEffect, useState } from 'react'
import Webcam from "react-webcam";
import TextField from '@mui/material/TextField';
import { AppBar, Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Toolbar } from '@mui/material';

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import CachedIcon from '@mui/icons-material/Cached';

import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import QRCode from "react-qr-code";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Stand({userData}) {

    const [etajID, setEtajID] = useState("");

    const [openRez, setOpenRez] = useState(false);
    const [titlu, setTitlu] = useState("");
    const [mesaj, setMesaj] = useState("");

    const [jucatori, setJucatori] = useState([])
    const [etaje, setEtaje] = useState([])

    const [openJucatori, setOpenJucatori] = useState(false);

    const [sigur, setSigur] = useState(false);


    const fetchJucatori = () => {
      fetch('/api/th/get_jucatori_api', {
        method: 'POST',
        body: JSON.stringify({
          email: userData.email
        })
      }).then((raspuns) => {
        raspuns.json().then((rasp)=> {setJucatori(rasp)})
      });
    }

  const trimiteJucator = () => {
    if(!etajID){
        setMesaj("TREBUIE SA SELECTEZI MUZEUL")
        setTitlu("ALO")
        setOpenRez(true)
      return;
    }


    const trimite = {
      muzeu: etajID,
    }


    
    fetch('/api/th/add_jucator_api', {
      method: 'POST',
      body: JSON.stringify(trimite)
    }).then((raspuns) => {
      if(raspuns.ok){
        raspuns.json().then((raspuns) => {
          setMesaj("https://ro049.com/noaptea-muzeelor/?cod="+raspuns.sid);
          setTitlu("Scanati codul de mai jos:")
          setOpenRez(true);
          fetchJucatori();
        })
      }else{
        setMesaj("")
        setTitlu("Eroare la conexiune!")
        setOpenRez(true)
      }
    });
    
    setSigur(false);
  }


  useEffect(()=>{
    fetchJucatori();
    fetch('/api/th/get_etaje_api', {
      method: 'POST',
    }).then((raspuns) => {
      raspuns.json().then((rasp)=> {
        let letaje = [];
        for(let r in rasp){
          if(!letaje.includes(rasp[r].muzeu)){
            letaje.push(rasp[r].muzeu);
          }
        }
        setEtaje(letaje);
      })
    });
  }, [])


  const label = { inputProps: { 'aria-label': 'Esti sigur ca vrei sa adaugi un nou jucator?' } };

  return (
    <>
    
    <div>
      <Dialog
        fullScreen
        open={openJucatori}
        onClose={()=>setOpenJucatori(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} style={{ background: '#640d53' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setOpenJucatori(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Jucatorii adaugati de tine - {jucatori.length}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={fetchJucatori}
              aria-label="close"
            >
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Refresh
            </Typography>

              <CachedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
        {
          jucatori.map((jucator, index) => (
              <div key={index}>
                <ListItem button onClick={()=>{setMesaj("https://ro049.com/noaptea-muzeelor/?cod="+jucator.sid);setTitlu("Codul jucatorului "+jucator.nume);setOpenRez(true);}}>
                  <ListItemText primary="Nume" secondary={jucator.nume} />
                  <ListItemText primary="Telefon" secondary={jucator.telefon} />
                </ListItem>
                <Divider />
              </div>
          ))
        }
          
        </List>
      </Dialog>
    </div>
    <div>
        <Dialog
          open={openRez}
          onClose={(event, reason)=> {if (reason !== 'clickaway' && reason !== 'backdropClick' ) {setOpenRez(false)}}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {titlu}
          </DialogTitle>
          <DialogContent>
            <br/>
            <DialogContentText id="alert-dialog-description">
            {(mesaj.startsWith("http") || mesaj.length==25)?<QRCode value={mesaj} level='M'/>:<>{mesaj}</>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> setOpenRez(false)}>Inchide</Button>
          </DialogActions>
        </Dialog>
      </div>


    <h2>Adauga jucator</h2>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="selectie-etaj-label">Muzeu</InputLabel>
        <Select
          labelId="selectie-etaj-label"
          id="selectie-etaj"
          value={etajID}
          onChange={(event) => setEtajID(event.target.value)}
          autoWidth
          label="Muzeu"
        >
          <MenuItem value="">
            <em>Selecteaza..</em>
          </MenuItem>
          
          {
          etaje.map((etaj, index) => (
            <MenuItem key={index} value={etaj}>{etaj}</MenuItem>
          ))
        }
        </Select>
      </FormControl>
      <div className="form-group">
            <FormControlLabel
                    control={
                      <Checkbox
                        
                        {...label}
                        checked={sigur}
                        onChange={() => setSigur(!sigur)}
                        sx={{
                          color: pink[800],
                          '&.Mui-checked': {
                            color: pink[600],
                          },
                        }}
                      />
                    }
                    label="Donatie minima 5 lei?"
                  />
            
          </div>
    <hr/>
    <button className='btn btn-success btn-lg' disabled={!sigur} onClick={trimiteJucator}>Adauga un jucator nou</button>
    <hr/>
    
    <button className='btn btn-primary btn-round' onClick={()=>setOpenJucatori(true)}>Jucatorii adaugati de tine</button>
    </>
  )
}
