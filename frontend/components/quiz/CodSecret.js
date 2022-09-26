import React, { useRef, useState } from 'react'

import { styled } from '@mui/material/styles';
import { TextField, Button, Typography, Box, keyframes, FormControl } from "@mui/material";

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

  const Cod = styled(TextField)(({ agita }) => ({
    animation: agita && `${agitaFrames} 0.3s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`
  }));


export default function CodSecret() {

    const htmlElRef = useRef(null)

    const [cod, setCod] = useState("");
    const [agita, setAgita] = useState(false);

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

    const handleButon = (event) =>{
      eroare();
  }

  return (
    <>
        <Titlu variant='h2'>RiverQuiz</Titlu>
        <Holder>
            <FormControl>
              <Cod inputRef={htmlElRef} agita={agita} label="Codul secret" variant="outlined" autoComplete='off' value={cod} onChange={handleCod} color={agita?"error":"primary"}/>
              <br/>
              <TrimiteButton onClick={handleButon} variant="contained">TRIMITE</TrimiteButton>
            </FormControl>
        </Holder>
    </>
  )
}
