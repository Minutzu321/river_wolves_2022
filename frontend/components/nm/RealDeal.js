import React, { useEffect } from 'react'
import Date from './Date'

import {useState} from 'react'
import Image from 'next/image'

import Cookies from 'universal-cookie';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar, Chip, CircularProgress } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Alege from './Alege';

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Ranking from './Ranking';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color="secondary" variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





function translat(str){
  switch(str) {
      case "AVRAMIDE":
        return <Chip label="Casa Avramide" icon={<MuseumOutlinedIcon/>} color="secondary" variant="outlined"/>
      case "ISTORIE":
        return <Chip label="Muzeul de Istorie" icon={<AccountBalanceOutlinedIcon/>} color="secondary" variant="outlined"/>
      case "ARTA":
          return <Chip label="Muzeul de Artă" icon={<ColorLensOutlinedIcon/>} color="secondary" variant="outlined"/>
      case "ACVARIU":
          return <Chip label="Muzeul Delta-Dunării" icon={<WaterOutlinedIcon/>} color="secondary" variant="outlined"/>
      default:
          return str;
    }
}

export default function RealDeal({user, fetchUser, snack, fetchDonatii, donatii}) {

    const [indiciu, setIndiciu] = useState("");
    const [stats, setStats] = useState("");
    const [arataPoza, setArataPoza] = useState(false);
    const [poza, setPoza] = useState("");
    const [rasp, setRasp] = useState("");
    const [idat, setIdat] = useState(false);

    const [open, setOpen] = useState(false);
    const [titlu, setTitlu] = useState("");
    const [mesaj, setMesaj] = useState("");

    const [sari, setSari] = useState(false);

    const [alege, setAlege] = useState(false);

    const [ranking, setRanking] = useState(false);

    const cookies = new Cookies();
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(()=>{
      fetchIndiciu();
    },[user])

    const nextSel = async (muzeu) => {
      const response = await fetch("/api/th/alege_api", {
        method: "POST",
        body: JSON.stringify({c: cookies.get('riverwolves_cod_noaptea_muzeelor'), muzeu: muzeu}),
      });
      if (response.ok) {
        setAlege(false);
        fetchUser();
      }else{
        snack("Eroare la server! Incercati mai tarziu!")
      }
    }
    

    const fetchIndiciu = () => {
        fetch('/api/th/indiciu_api', {
            method: 'POST',
            body: JSON.stringify({c: cookies.get('riverwolves_cod_noaptea_muzeelor'), user: user}),
          }).then((raspuns) => {
            if(raspuns.ok){
                raspuns.json().then((udat) =>{
                    fetchDonatii();
                    setIdat(udat);
                    if(!udat.next && !udat.terminat){
                      setAlege(false);
                      //TODO NU MAI TREBUIE
                      setIndiciu(udat.indiciu);
                      setStats(udat.total-udat.ramase+"/"+udat.total);
                      setArataPoza(udat.arataPoza);
                      setPoza(udat.poza);
                    }else if(udat.next){
                      setIndiciu(false);
                      setAlege(true);
                    }else{
                      setIndiciu(false);
                      setRanking(true);
                    }
                  })
            }else{
              snack("Eroare la server! Incercati mai tarziu!")
            }
        });
    }

    const sariPeste = async () => {
      setSari(false);
      setIndiciu(false);
      const response = await fetch("/api/th/sari_api", {
        method: "POST",
        body: JSON.stringify({id: idat.id}),
      });
      if (response.ok) {
        fetchUser();
      }else{
        snack("Eroare la server! Incercati mai tarziu!")
      }
    }

    const trimite = async () => {
      setTitlu("Se verifică răspunsul..");
      setMesaj(<CircularProgress color="secondary"/>);
      setOpen(true);

      if(!rasp || rasp.length < 1){
        setTitlu("Răspuns greșit!");
        setMesaj(<Chip style={{margin: 'auto'}} label="Răspunsul este greșit!" color="error" />);
        setOpen(true);
        return;
      }
     
      const response = await fetch("/api/th/raspuns_api", {
        method: "POST",
        body: JSON.stringify({c: cookies.get('riverwolves_cod_noaptea_muzeelor'), user:user, raspuns: rasp}),
      });
      

      if (response.ok) {
        const srasp = await response.json();
        if(srasp.corect){
          setTitlu("Răspuns corect!");
          setMesaj(<Chip style={{margin: 'auto'}} label="Răspuns este corect!" color="success" />);
          setOpen(true);
          setRasp("");
          setIndiciu(false);
          fetchIndiciu();
        } else if(srasp.aproape){
          setTitlu("Răspuns aproape corect!");
          setMesaj(<Chip style={{margin: 'auto'}} label="Sunteți pe aproape!" color="warning" />);
          setOpen(true);
        }else{
          setTitlu("Răspuns greșit!");
          setMesaj(<Chip style={{margin: 'auto'}} label="Răspunsul este greșit!" color="error" />);
          setOpen(true);
          setRasp("");
        }
      } else {
        setTitlu("Eroare!");
        setMesaj("A apărut o eroare la conexiunea cu serverul!");
        setOpen(true);
      }
    }

  return (
    <>
    <div>
      <Dialog
        open={sari}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>setSari(false)}
        aria-describedby="dialog-raspuns-sari"
      >
        <DialogTitle>Sigur doriți să treceți peste intrebare?</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-raspuns-sari">
            Dacă săriți un indiciu, nu veți mai putea reveni la el iar acest lucru vă va trage în jos pe tabela scorurilor.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={()=>setSari(false)}>Anulează</Button>
          <Button color="error" onClick={sariPeste}>Sari peste</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="dialog-raspuns-server"
      >
        <DialogTitle>{titlu}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-raspuns-server">
            {mesaj}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
    <div className="card text-center">
      <div className="card-header mt-2">
        <Chip color="secondary" avatar={<Avatar src="/rw-avatar.png" />} label="Eveniment marca River Wolves"/>
      </div>
        {(!user.nume || !user.telefon) ? <Date fetchUser={fetchUser} snack={snack}/>: <>
            <div className="card-header mt-2">
              <Image src="/sponsori/icem.jpg" width={500} height={190}/>
              <br/>
                {!indiciu?<>Noaptea Muzeelor, 2022</>:<>
                Indicii rezolvate: {stats}
                <br/>
                {translat(user.start)}
                <br/>
                {idat&&<Chip label={idat.etaj} color="warning" variant="outlined"/>}
                </>}
            </div>
            <div className="card-body">
                {!indiciu?<>
                  {alege?<Alege user={user} nextSel={nextSel}/>:<>
                    {ranking?<Ranking snack={snack}/>:<CircularProgress color="secondary"/>}
                  </>}
                </>:
                <>
                  <h4 className="card-title">{indiciu}</h4>
                  {(idat.total===idat.ramase) && <p>Introduceți răspunsul în câmpul de sub poză</p>}
                  {arataPoza&&<img src={poza} alt="Indiciu"  style={{maxWidth: '300px'}}/>}
                  <hr/>
                  {!!idat.forma&&<p>Forma răspunsului: <strong>{idat.forma}</strong></p>}
                  <br/>
                  <Stack
                  component="form"
                  sx={{
                      width: '25ch',
                  }}
                  spacing={2}
                  noValidate
                  autoComplete="off"
                  style={{margin: 'auto'}}
                  >
                    <form onSubmit={e => { e.preventDefault(); }}>
                      <TextField id="raspuns-outile" color="secondary" label="Răspuns.." variant="outlined" value={rasp} onChange={e => setRasp(e.target.value)} onKeyPress={(e) => {if(e.key === 'Enter') {e.preventDefault(); trimite();}}} autoComplete="off"/>
                      <br/><br/>
                      <Button color="secondary" variant="outlined" onClick={trimite}>
                          Trimite
                      </Button>
                      <Button color="warning" variant="outlined" onClick={()=>setSari(true)}>
                          Sari peste
                      </Button>
                    </form>
                  </Stack>
                  <LinearProgressWithLabel value={((idat.total-idat.ramase)/idat.total)*100} />
                </>}
            </div>
            <div className="card-footer text-muted mb-2 text-danger">
              <p className='text-danger'>Vă rugăm nu atingeți exponatele!</p>
            </div>
            {donatii && <div className="card-footer text-muted mb-2">
              Donații strânse: <VolunteerActivismIcon/> {donatii} lei
            </div>}
        </>}
    </div>
    </>
  )
}
