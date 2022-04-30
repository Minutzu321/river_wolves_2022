import { Backdrop, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useState } from 'react'
import { pink } from '@mui/material/colors';

import Webcam from "react-webcam";

export default function AdminIndicii() {

    const [indicii, setIndicii] = useState([]);
    const [findicii, setFIndicii] = useState([]);

    const [openImagine, setOpenImagine] = useState(false);
    const [vizImg, setVizImg] = useState("");

    const [etaje, setEtaje] = useState([])
    const [intrebare, setIntrebare] = useState('');
    const [raspuns, setRaspuns] = useState('');
    const [arataPoza, setArataPoza] = useState(true);
    const [arataForma, setArataForma] = useState(true);
    const [etajID, setEtajID] = useState("");

    const [poza, setPoza] = useState("");
    const [cam, setCam] = useState(false);
    

    const [openRez, setOpenRez] = useState(false);
    const [titlu, setTitlu] = useState("");

    const [openSterge, setOpenSterge] = useState(false);

    const [target, setTarget] = useState({})

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");

    const videoConstraints = {
        width: 640,
        height: 320,
        facingMode: "environment"
      };

    const imagine = (url) => {
        setVizImg(url);
        setOpenImagine(true);
    }

    const salveaza = () => {
        if(!etajID){
            snack("Nu s-a salvat. Trebuie sa selectezi un etaj.")
            return;
        }
    
        if(!intrebare || intrebare.length < 3){
            snack("Nu s-a salvat. Trebuie sa pui o intrebare valida.")
            return;
        }


        const trimite = {
            id: target.id,
            poza: poza,
            intrebare: intrebare,
            raspuns: raspuns,
            arataPoza: arataPoza,
            arataForma: arataForma,
            etajID: etajID,
        }
        fetch('/api/th/edit_indiciu_api', {
            method: 'POST',
            body: JSON.stringify(trimite)
          }).then((raspuns) => {
            if(raspuns.ok){
              snack("Indiciu salvat cu succes!")
              fetchIndicii();
            }else{
              snack("A aparut o eroare la conexiunea cu serverul. Incearca mai tarziu.")
            }
          });
    }

    const edit = (indiciu) => {
        setTarget(indiciu)
        setTitlu("Indiciul lui "+indiciu.creator)
        setEtajID(indiciu.etajID)
        setIntrebare(indiciu.intrebare)
        setRaspuns(indiciu.raspuns)
        setArataPoza(indiciu.arataPoza)
        setArataForma(indiciu.arataForma)
        setCam(false);
        setPoza("")
        setOpenRez(true);
    }

    const snack = (mesaj) => {
        setSnackMessage(mesaj);
        setSnackOpen(true);
    };
    
    const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSnackOpen(false);
    };

    const sterge = () => {
        fetch('/api/th/del_indiciu_api', {
            method: 'POST',
            body: JSON.stringify({id: target.id})
          }).then((raspuns) => {
            if(raspuns.ok){
              snack("Indiciul a fost sters!")
              fetchIndicii();
            }else{
              snack("A aparut o eroare la conexiunea cu serverul. Incearca mai tarziu.")
            }
          });
    };

    const fetchIndicii = () => {
        fetch('/api/th/get_indicii_api', {
          method: 'POST',
          body: JSON.stringify({})
        }).then((raspuns) => {
          raspuns.json().then((rasp)=> {setIndicii(rasp); setFIndicii(rasp);})
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

    const label = { inputProps: { 'aria-label': 'Arata poza jucatorului' } };
    const label1 = { inputProps: { 'aria-label': 'Arata forma indiciului' } };

    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase().trim();
        let result = [];
        const verif = (str) => {
            return str.trim().toLowerCase().search(value) != -1;
        }

        result = indicii.filter((data) => {
            if(verif(data.creator) || verif(data.intrebare) || verif(data.raspuns) || verif(data.etaj.muzeu) || verif(data.etaj.etaj)){
                return true;
            }else{
                return false;
            }
        });
        setFIndicii(result);
    }

    return (
        <>
            <h2>Administrare indicii</h2>
            <h5>{findicii.length} indicii</h5>
            <br/>
            <TextField id="outlined-basic" label="Cauta indicii" variant="outlined" onChange={(event) =>handleSearch(event)} />
            <br/>
            <button className='btn btn-primary btn-round' onClick={()=>{fetchIndicii(); snack("Indicii reincarcate!");}}>
                <i className='now-ui-icons arrows-1_refresh-69'></i>
                Refresh
            </button>
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                message={snackMessage}
                action={action}
            />

            
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openImagine}
                onClick={()=>{setOpenImagine(false); setVizImg("")}}
            >
                <img src={vizImg} />
            </Backdrop>



            <div>
                <Dialog
                open={openSterge}
                onClose={()=> setOpenSterge(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {target.creator}
                </DialogTitle>
                <DialogContent>
                    <br/>
                    <DialogContentText id="alert-dialog-description">
                        <strong>Sigur vrei sa stergi indiciul?</strong>
                        <hr/>
                    Intrebare: <strong>{target.intrebare}</strong>
                    <br/>
                    Raspuns: <strong>{target.raspuns}</strong>
                    <br/>
                    Acuratete: <strong>{target.acc}</strong> metri
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setOpenSterge(false)} color="success">Anuleaza</Button>
                    <Button onClick={()=> {setOpenSterge(false); sterge();}} color="error" autoFocus>Da, sterge</Button>
                </DialogActions>
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
                    <div className="form-group">
                        <TextField id="intrebare" label="Intrebare" multiline maxRows={10} variant="outlined" value={intrebare} onChange={e => setIntrebare(e.target.value)}/>
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
                            label="Arata forma indiciului"
                        />
                        <br/>
                        <button className='btn btn-info' onClick={()=> setCam(!cam)}>Inlocuieste poza</button>
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
                            </Webcam>:<img className='cameraa' src={poza}/>
                        }

                        {poza?<button className='btn btn-warning' onClick={() => {setPoza("")}}>Sterge poza</button>:<></>}
                    
                    </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setOpenRez(false)} color="error">Anuleaza</Button>
                    <Button onClick={()=> {setOpenRez(false); salveaza()}} color="success" autoFocus>Salveaza</Button>
                </DialogActions>
                </Dialog>
            </div>


            <div className="row">
                {
                    findicii.map((indiciu, index) => (
                        <div className='col-md-6 ml-auto col-xl-3 mr-auto' key={index}>
                            <div className="card">
                                <div className="card-header mt-2">
                                    {indiciu.creator}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Intrebare: <b>{indiciu.intrebare}</b></h5>
                                    <h5 className="card-title">Raspuns: <b>{indiciu.raspuns}</b></h5>
                                    <h5 className="card-title">Arata poza: <b>{indiciu.arataPoza?"da":"nu"}</b></h5>
                                    <h5 className="card-title">Locatie: <b>{indiciu.lat+", "+indiciu.lng}</b></h5>
                                    <h5 className="card-title">Acuratete: <b>{indiciu.acc+" metri"}</b></h5>
                                    <h5 className="card-title">Etaj: <b>{indiciu.etaj.muzeu+" - "+indiciu.etaj.etaj}</b></h5>
                                    <button className="btn btn-primary btn-icon btn-round" onClick={()=>imagine(indiciu.poza)}>
                                        <i className="now-ui-icons ui-1_zoom-bold"></i>
                                    </button>
                                    <button className="btn btn-info btn-icon btn-round" type="button" onClick={()=>edit(indiciu)}>
                                        <i className="now-ui-icons loader_gear"></i>
                                    </button>
                                    <button className="btn btn-danger btn-icon btn-round" onClick={()=>{setTarget(indiciu); setOpenSterge(true);}}>
                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                    </button>
                                </div>
                                <div className="card-footer text-muted mb-2">
                                    {index+1}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button className='btn btn-primary btn-round' onClick={()=>{fetchIndicii(); snack("Indicii reincarcate!");}}>
                <i className='now-ui-icons arrows-1_refresh-69'></i>
                Refresh
            </button>
        </>
    )
}
