import * as React from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Avatar, Chip } from '@mui/material';

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import dynamic from "next/dynamic";

const Harta = dynamic(() => import("./Harta"), {
  loading: () => "Se incarca harta...",
  ssr: false
});

export default function Alege({user, nextSel}) {

  const [sel, setSel] = React.useState(-1);
  const [coords, setCoords] = React.useState([0,0]);

  

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

  return (
      <>
      <h6>Ați terminat indiciile de la {translat(user.start)}</h6>
      <h6>Alegți următorul muzeu la care să rezolvați indicii <SearchOutlinedIcon/></h6>
      {sel==0&&<>
        <h3>Muzeul de Istorie</h3>
        <p>Locație: Monumentul Independenței</p>
        <p>Apasă pe butonul de mai jos pentru a selecta muzeul.</p>
        <Button color="secondary" variant="contained" onClick={()=>{nextSel("ISTORIE")}}>Mergi la Muzeul de Istorie</Button>
      </>}
      {sel==1&&<>
        <h3>Muzeul de Artă</h3>
        <p>Locație: Monumentul Independenței</p>
        <p>Apasă pe butonul de mai jos pentru a selecta muzeul.</p>
        <Button color="secondary" variant="contained" onClick={()=>{nextSel("ARTA")}}>Mergi la Muzeul de Artă</Button>
      </>}
      {sel==2&&<>
        <h3>Casa Avramide</h3>
        <p>Strada: Strada Grigore Antipa 2</p>
        <p>Apasă pe butonul de mai jos pentru a selecta muzeul.</p>
        <Button color="secondary" variant="contained" onClick={()=>{nextSel("AVRAMIDE")}}>Mergi la Casa Avramide</Button>
      </>}
      {sel==3&&<>
        <h3>Centrul Muzeal Ecoturistic "Delta Dunării"(Acvariu)</h3>
        <p>Apasă pe butonul de mai jos pentru a selecta muzeul.</p>
        <Button color="secondary" variant="contained" onClick={()=>{nextSel("ACVARIU")}}>Mergi la Acvariu</Button>
      </>}
      {sel !== -1&&<>
        <br/><br/>
        <Harta coords={coords}/>
        <br/><br/>
        <hr/>
      </>}
        <ButtonGroup size="large" color="secondary" orientation="vertical" aria-label="large button group">
            <Button disabled={user.muzee.ISTORIE || user.start==="ISTORIE"} onClick={()=>{if(!user.muzee.ISTORIE){setSel(0); setCoords([45.186007, 28.815076])}}}><AccountBalanceOutlinedIcon/>Muzeul de Istorie<AccountBalanceOutlinedIcon/></Button>
            <Button disabled={user.muzee.ARTA || user.start==="ARTA"} onClick={()=>{if(!user.muzee.ARTA){setSel(1); setCoords([45.180155, 28.804791])}}}><ColorLensOutlinedIcon/>Muzeul de Artă<ColorLensOutlinedIcon/></Button>
            <Button disabled={user.muzee.AVRAMIDE || user.start==="AVRAMIDE"} onClick={()=>{if(!user.muzee.AVRAMIDE){setSel(2); setCoords([45.177021, 28.801707])}}}><MuseumOutlinedIcon/>Casa Avramide<MuseumOutlinedIcon/></Button>
            <Button disabled={user.muzee.ACVARIU || user.start==="ACVARIU"} onClick={()=>{if(!user.muzee.ACVARIU){setSel(3); setCoords([45.179829, 28.805809])}}}><WaterOutlinedIcon/>Muzeul Delta-Dunării<WaterOutlinedIcon/></Button>
        </ButtonGroup>
      </>
  );
}