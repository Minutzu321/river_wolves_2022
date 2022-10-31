import React, { useRef, useState } from 'react'

import { alpha, styled, useTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

import { Select, Button, Typography, Box, keyframes, FormControl, FormGroup, FormControlLabel, Switch, InputAdornment, IconButton, OutlinedInput, InputLabel, MenuItem, TextField } from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
const butonApasa = keyframes`
  0% {
    -webkit-box-shadow: 0 0 #484848, 0 0 C, 0 0 #484848, 0 0 #484848, 0 0 #484848, 0 0 #484848, 0 0 #484848, 0 0 #484848;
            box-shadow: 0 0 #484848, 0 0 #484848, 0 0 #484848, 0 0 #484848, 0 0 #484848, 0 0 #484848, 0 0 #484848, 0 0 #484848;
    -webkit-transform: translateX(0) translateY(0);
            transform: translateX(0) translateY(0);
  }
  100% {
    -webkit-box-shadow: 0px 0px #484848, 1px -1px #484848, 2px -2px #484848, 3px -3px #484848, 4px -4px #484848, 5px -5px #484848, 6px -6px #484848, 2px -2px #484848;
            box-shadow: 0px 0px #484848, 1px -1px #484848, 2px -2px #484848, 3px -3px #484848, 4px -4px #484848, 5px -5px #484848, 6px -6px #484848, 2px -2px #484848;
    -webkit-transform: translateX(-8px) translateY(8px);
            transform: translateX(-8px) translateY(8px);
  }
`
const agitaFrames = keyframes`
0%,
100% {
  -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
  -webkit-transform-origin: 50% 100%;
          transform-origin: 50% 100%;
}
10% {
  -webkit-transform: rotate(2deg);
          transform: rotate(2deg);
}
20%,
40%,
60% {
  -webkit-transform: rotate(-4deg);
          transform: rotate(-4deg);
}
30%,
50%,
70% {
  -webkit-transform: rotate(4deg);
          transform: rotate(4deg);
}
80% {
  -webkit-transform: rotate(-2deg);
          transform: rotate(-2deg);
}
90% {
  -webkit-transform: rotate(2deg);
          transform: rotate(2deg);
}
`

const Holder = styled(Box)(({theme}) => ({
    maxWidth: "300px",
    height: 'auto',
    background: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    padding: 30,
  }));

  const TrimiteButton = styled(Button)(({theme}) => ({
    background: '#363636',
    color: 'white',
    animation: `${butonApasa} 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both`,
    "&:active": {
      animation: `${butonApasa} 0.15s cubic-bezier(0.470, 0.000, 0.745, 0.715) reverse both`,
    }
  }));

  const Titlu = styled(Typography)(({theme}) => ({
    color: "#eee",
  }));

  const FormControlAnimat = styled(FormControl)(({ agita }) => ({
    animation: agita && `${agitaFrames} 0.3s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`
  }));


  const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: pink[600],
      '&:hover': {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: pink[600],
    },
  }));

export default function CreazaShort() {
    const theme = useTheme();
    const htmlElRef = useRef(null)
    const htmlElRef2 = useRef(null)

    const [cod, setCod] = useState(genId(6));
    const [link, setLink] = useState("");
    const [agita, setAgita] = useState(0);
    const [agitaLink, setAgitaLink] = useState(0);
    const [qpublic, setQpublic] = useState(false);

    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    const setFocus2 = () => {htmlElRef2.current &&  htmlElRef2.current.focus()}

    const eroare = () =>{
      setFocus();
      setAgita(1);
      setTimeout(() => {
        setAgita(0);
      }, 300);
    }

    const eroare2 = () =>{
      setFocus2();
      setAgitaLink(1);
      setTimeout(() => {
        setAgitaLink(0);
      }, 300);
    }

    const isValidUrl = urlString=> {
	  	var urlPattern = new RegExp('^(https?:\\/\\/)?'+
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+
	    '(\\#[-a-z\\d_]*)?$','i');
      return !!urlPattern.test(urlString);
	  }

    const handleCod = (event) =>{
        let aranjat = event.target.value.toUpperCase().replace(/[^A-Za-z0-9]/g, "");
        if(aranjat.length > 11){
            aranjat = aranjat.substring(0,11);
            eroare();
        }
        setCod(aranjat);
    }

    const handleLink = (event) =>{
      setLink(event.target.value);
  }

    const handlePublic = (event) => {
      setQpublic(event.target.checked);
    };

    function genId(l) {
      var rez             = '';
      var caractere       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var lungimeCaractere = caractere.length;
      for ( var i = 0; i < l; i++ ) {
        rez += caractere.charAt(Math.floor(Math.random() * lungimeCaractere));
      }
      return rez;
    }

    const handleRandom = () =>{
      setCod(genId(6));
    }

    const handleButon = () =>{
      if(cod.length<6 || cod.toLowerCase() === "creaza"){
        eroare();
        return;
      }
      if(!isValidUrl(link)){
        eroare2();
        return;
      }
    }

  return (
    <>
      <Titlu variant='h2'>RiverShorts</Titlu>
      <Holder theme={theme}>
        <FormGroup>
            <FormControlAnimat agita={agita} variant="outlined">
              <InputLabel htmlFor="codid">Cod</InputLabel>
              <OutlinedInput inputRef={htmlElRef} label={"Cod"} autoComplete='off' id="codid"
               value={cod} onChange={handleCod} color={agita?"error":"primary"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="genereaza un cod random"
                      onClick={handleRandom}
                      edge="end"
                    >
                      {<ShuffleIcon/>}
                    </IconButton>
                  </InputAdornment>
                }/>
            </FormControlAnimat>
            <br/>
            <FormControlAnimat agita={agitaLink} variant="outlined">
              <TextField inputRef={htmlElRef2}
                label={"Link"} autoComplete='off' id="linkid"
               value={link} onChange={handleLink} color={agitaLink?"error":"primary"}
              />
            </FormControlAnimat>
            <br/>
            <FormControlLabel control={<GreenSwitch checked={qpublic} onChange={handlePublic} />} label={<Typography sx={{
              fontFamily: 'Kanit',
            }}  color="secondary" variant="p">Public</Typography>} />
            <br/>
            <TrimiteButton onClick={handleButon} variant="contained">GENEREAZA</TrimiteButton>
        </FormGroup>
      </Holder>
    </>
  )
}
