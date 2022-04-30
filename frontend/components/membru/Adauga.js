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

import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Adauga({userData}) {

    const [cam, setCam] = useState(false);

    const [locShow, setLocShow] = useState(false);
    const [locStat, setLocStat] = useState(<div></div>)
    const [watchID, setWatchID] = useState(-1);


    const [locatie, setLocatie] = useState({});
    const [poza, setPoza] = useState("");
    const [intrebare, setIntrebare] = useState('');
    const [raspuns, setRaspuns] = useState('');
    const [arataPoza, setArataPoza] = useState(true);
    const [etajID, setEtajID] = useState("");
    const [arataForma, setArataForma] = useState(true);

    const [openRez, setOpenRez] = useState(false);
    const [titlu, setTitlu] = useState("");
    const [mesaj, setMesaj] = useState("");

    const [indicii, setIndicii] = useState([])
    const [etaje, setEtaje] = useState([])

    const [openIndicii, setOpenIndicii] = useState(false);

    const [openImagine, setOpenImagine] = useState(false);
    const [vizImg, setVizImg] = useState("");

    const label = { inputProps: { 'aria-label': 'Arata poza jucatorului' } };
    const label1 = { inputProps: { 'aria-label': 'Arata forma indiciului' } };


    const imagine = (url) => {
      setVizImg(url);
      setOpenImagine(true);
    }

    const fetchIndicii = () => {
      fetch('/api/th/get_indicii_api', {
        method: 'POST',
        body: JSON.stringify({
          email: userData.email
        })
      }).then((raspuns) => {
        raspuns.json().then((rasp)=> {setIndicii(rasp)})
      });
    }

    const videoConstraints = {
      width: 640,
      height: 320,
      facingMode: "environment"
    };


  const wp = () => {
    setLocShow(true)
    if(watchID !== -1) navigator.geolocation.clearWatch(watchID);
    let wid = navigator.geolocation.watchPosition(
        (position) => {
                setLocShow(true);
                let data = {
                    acc: Number((position.coords.accuracy).toFixed(4)),
                    vit: position.coords.speed,
                    hed: position.coords.heading,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                if(position.coords.accuracy < 10){
                    setLocStat(<span className="badge badge-success">Perfecta!</span>);
                }else if(position.coords.accuracy < 20){
                    setLocStat(<span className="badge badge-success">Acceptabil</span>);
                }else if(position.coords.accuracy < 31){
                  setLocStat(<span className="badge badge-warning">Se poate mai bine..</span>);
                }else if(position.coords.accuracy < 50){
                    setLocStat(<span className="badge badge-danger">GROAZNICA</span>);
                }else{
                    setLocStat(<span className="badge badge-danger">INUTILIZABILA</span>);
                }
                setLocatie(data);
                console.log(position.coords);
            
        },
        (error) => {
          setLocStat(<span className="badge badge-danger">Eroare la locatie - {error.message}</span>)
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, forceRequestLocation: true, distanceFilter: 10}
    );
    setWatchID(wid);
  }

  const clear = () => {
    setCam(false);
    setPoza("");
    setIntrebare("");
    setRaspuns("");
    setArataPoza(true);
    setEtajID("");
  }

  const trimiteIndiciu = () => {
    const trimite = {
      locatie: locatie,
      poza: poza,
      intrebare: intrebare,
      raspuns: raspuns,
      arataPoza: arataPoza,
      arataForma: arataForma,
      etajID: etajID,
    }

    if(!locatie || !locatie.acc){
      setTitlu("Eroare");
      setMesaj("Eroare la locatie. Asigura-te ca ai apasat pe butonul de locatie.")
      setOpenRez(true);
      return;
    }

    if(!etajID){
      setTitlu("Eroare");
      setMesaj("Trebuie sa setezi etajul la care te afli!")
      setOpenRez(true);
      return;
    }

    if(!intrebare || intrebare.length < 3){
      setTitlu("Eroare");
      setMesaj("Trebuie sa pui o intrebare valida!")
      setOpenRez(true);
      return;
    }

    // if(!raspuns || raspuns.length < 3){
    //   setTitlu("Eroare");
    //   setMesaj("Trebuie sa pui un raspuns valid!")
    //   setOpenRez(true);
    //   return;
    // }

    if(!poza){
      setTitlu("Eroare");
      setMesaj("Trebuie sa faci o poza!")
      setOpenRez(true);
      return;
    }

    // if(locatie.acc > 30){
    //   setTitlu("Eroare");
    //   setMesaj("Locatia nu se poate folosi! Trebuie o acuratete de cel mult 30 metri")
    //   setOpenRez(true);
    //   return;
    // }

    
    fetch('/api/th/add_indiciu_api', {
      method: 'POST',
      body: JSON.stringify(trimite)
    }).then((raspuns) => {
      if(raspuns.ok){
        setMesaj("Indiciul a fost adaugat!")
        setTitlu("Indiciu adaugat!")
        setOpenRez(true);
        clear();
        fetchIndicii();
      }else{
        setMesaj("A aparut o eroare la conexiunea cu serverul! Incearca mai tarziu!")
        setTitlu("Eroare!")
        setOpenRez(true)
      }
    });
  }


  useEffect(()=>{
    fetchIndicii();
    fetch('/api/th/get_etaje_api', {
      method: 'POST',
    }).then((raspuns) => {
      raspuns.json().then((rasp)=> {setEtaje(rasp);})
    });
  }, [])

  return (
    <>
    
    <div>
      <Dialog
        fullScreen
        open={openIndicii}
        onClose={()=>setOpenIndicii(false)}
        TransitionComponent={Transition}
      >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openImagine}
        onClick={()=>{setOpenImagine(false); setVizImg("")}}
      >
        <img src={vizImg} />
      </Backdrop>
        <AppBar sx={{ position: 'relative' }} style={{ background: '#640d53' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setOpenIndicii(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Indiciile tale - {indicii.length}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
        {
          indicii.map((indiciu, index) => (
              <div key={index}>
                <ListItem button onClick={()=>imagine(indiciu.poza)}>
                  <ListItemText primary="Intrebare" secondary={indiciu.intrebare} />
                  <ListItemText primary="Raspuns" secondary={indiciu.raspuns} />
                </ListItem>
                <ListItem button onClick={()=>imagine(indiciu.poza)}>
                  <ListItemText primary="Acuratete" secondary={indiciu.acc+" metri"} />
                  <ListItemText primary="Etaj" secondary={indiciu.etaj.muzeu+" - "+indiciu.etaj.etaj} />
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


    <h2>Adauga indicii</h2>
    <div className="form-group">
      <TextField id="intrebare" label="Intrebare" variant="outlined" multiline maxRows={10} value={intrebare} onChange={e => setIntrebare(e.target.value)}/>
    </div>
    <div className="form-group">
      <TextField id="raspuns" label="Raspuns" variant="outlined" value={raspuns} onChange={e => setRaspuns(e.target.value)}/>
    </div>

    <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="selectie-etaj-label">Etaj</InputLabel>
        <Select
          labelId="selectie-etaj-label"
          id="selectie-etaj"
          value={etajID}
          onChange={(event) => setEtajID(event.target.value)}
          autoWidth
          label="Age"
        >
          <MenuItem value="">
            <em>Selecteaza..</em>
          </MenuItem>
          {
          etaje.map((etaj, index) => (
            <MenuItem key={index} value={etaj.id}>{etaj.muzeu+" - "+etaj.etaj}</MenuItem>
          ))
        }
        </Select>
      </FormControl>

    <div className="form-group">
      <FormControlLabel
              control={
                <Checkbox
                  
                  {...label}
                  checked={arataPoza}
                  onChange={() => setArataPoza(!arataPoza)}
                  sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                      color: pink[600],
                    },
                  }}
                />
              }
              label="Arata poza jucatorilor"
            />
            <br/>
      <FormControlLabel
              control={
                <Checkbox
                  
                  {...label1}
                  checked={arataForma}
                  onChange={() => setArataForma(!arataForma)}
                  sx={{
                    color: pink[800],
                    '&.Mui-checked': {
                      color: pink[600],
                    },
                  }}
                />
              }
              label="Arată forma răspunsului"
            />
    
    </div>
      
      <button className='btn btn-info' onClick={()=> wp()}>Ia locatia</button>
      <button className='btn btn-info' onClick={()=> setCam(!cam)}>Camera</button>
      <br/>
    
    {cam?<Webcam
        width={640}
        height={320}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => (
          <>
          <br/>
          <button
            className='btn btn-warning'
            onClick={() => {
              const imageSrc = getScreenshot()
              setPoza(imageSrc);
              setCam(false);
            }}
          >
            Fa poza
          </button>
        </>)}
      </Webcam>:<img className='cameraa' src={poza}/>}
      <br/>
    {(locShow && <div>
                    <h5>Acuratetea locatiei: {locatie.acc} metri</h5>
                    {locStat}</div>)
            }
    <hr/>
    <button className='btn btn-success btn-lg' onClick={trimiteIndiciu}>Salveaza indiciul</button>
    <button className='btn btn-danger btn-lg' onClick={clear}>Anuleaza indiciul</button>
    <hr/>
    
    <button className='btn btn-primary btn-round' onClick={()=>setOpenIndicii(true)}>Indiciile tale</button>
    </>
  )
}
