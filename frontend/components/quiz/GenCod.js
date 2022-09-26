import React, { useRef, useState } from 'react'

import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { TextField, Button, Typography, Box, keyframes, FormControl, FormGroup, FormControlLabel, Switch, InputAdornment, IconButton, OutlinedInput, InputLabel } from "@mui/material";
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

const tremuraFrames = `
0% {
  -webkit-transform: translate(0);
          transform: translate(0);
}
20% {
  -webkit-transform: translate(-2px, 2px);
          transform: translate(-2px, 2px);
}
40% {
  -webkit-transform: translate(-2px, -2px);
          transform: translate(-2px, -2px);
}
60% {
  -webkit-transform: translate(2px, 2px);
          transform: translate(2px, 2px);
}
80% {
  -webkit-transform: translate(2px, -2px);
          transform: translate(2px, -2px);
}
100% {
  -webkit-transform: translate(0);
          transform: translate(0);
}
`

const Holder = styled(Box)(() => ({
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

  const TrimiteButton = styled(Button)(() => ({
    background: '#363636',
    color: 'white',
    animation: `${butonApasa} 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both`,
    "&:active": {
      animation: `${butonApasa} 0.15s cubic-bezier(0.470, 0.000, 0.745, 0.715) reverse both`,
    }
  }));

  const Titlu = styled(Typography)(() => ({
    color: "#eee",
  }));

  const Cod = styled(OutlinedInput)(({ agita }) => ({
    animation: agita && `${agitaFrames} 0.3s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`
  }));


export default function GenCod() {

    const htmlElRef = useRef(null)

    const [cod, setCod] = useState("");
    const [agita, setAgita] = useState(false);
    const [live, setLive] = useState(true);

    const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

    const eroare = () =>{
      setFocus();
      setAgita(true);
      setTimeout(() => {
        setAgita(false);
      }, 300);
    }

    const handleCod = (event) =>{
        let aranjat = event.target.value.toUpperCase();
        if(aranjat.length > 11){
            aranjat = aranjat.substring(0,11);
            eroare();
        }
        setCod(aranjat);
    }

    const handleLive = (event) => {
      setLive(event.target.checked);
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

    const handleButon = (event) =>{
      eroare();
    }

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

  return (
    <>
        <Titlu variant='h2'>RiverQuiz</Titlu>
        <Holder>
            <FormGroup>
            <FormControl variant="outlined">
              <InputLabel htmlFor="codid">Cod</InputLabel>
              <Cod inputRef={htmlElRef} agita={agita} label={"Cod"} autoComplete='off' id="codid"
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
              <br/>
              </FormControl>
              <FormControlLabel control={<GreenSwitch checked={live} onChange={handleLive} />} label={<Typography sx={{
                fontFamily: 'Kanit',
              }}  color="secondary" variant="p">Live</Typography>} />
              <br/>
              <TrimiteButton onClick={handleButon} variant="contained">GENEREAZA</TrimiteButton>
            </FormGroup>
        </Holder>
    </>
  )
}
