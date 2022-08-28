import React, { useState } from 'react'

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

import { publish } from '../../libs/events';

var scrisNume = false;
var scrisTel = false;
var scrisDat = false;

export default function DatePersonale() {

  const [nume, setNume] = useState("");
  const [tel, setTel] = useState("");
  const [dataNaterii, setDataNaterii] = useState(new Date());

  const [gon, setGon] = useState(false);
  const [got, setGot] = useState(false);
  const [god, setGod] = useState(false);

  function clean(d, trim=true){
    if(trim){
      d = d.trim();
    }
    while(d.includes("  ")){
      d = d.replace("  ", " ");
    }
    return d
  }

  function fNume(num){
    num = clean(num);

    if(!scrisNume)
      return "";

    let splits = num.split(" ")

    if(splits.length < 2){
      return "Numele trebuie sa fie intreg!"
    }
    let valid = true;
    splits.forEach((s)=>{
      if(s.length < 3){
        valid = false
      }
    })
    if(!valid){
      return "Numele nu este valid!"
    }
    return ""
  }

  
  function numaiNumere(str) {
    return /^[0-9]+$/.test(str);
  }

  function fTel(telef){
    if(!scrisTel)
      return "";
    
    if(telef.length != 10 || !numaiNumere(telef) || !(telef.startsWith("07") || telef.startsWith("02"))){
      return "Numarul de telefon nu este valid"
    }

    return ""
  }

  function fData(dat){
    
    if(!dat || dat.invalid){
      return "Data nu este valida"
    }

    if(!!dat.c){
      dat = new Date(dat.ts)
    }

    var azi = new Date();
    var varsta = azi.getFullYear() - dat.getFullYear();
    var m = azi.getMonth() - dat.getMonth();
    if (m < 0 || (m === 0 && azi.getDate() < dat.getDate())) {
      varsta--;
    }

    if(!scrisDat)
      return "";
    
    if(varsta < 14){
      return "Varsta minima e 14 ani"
    }

    if(varsta > 100){
      return "Varsta maxima e 100 de ani"
    }

    return ""
  }

  function eok(v){
    return v.length < 2
  }

  function handleGata(){
    publish('loading');
    axios.post('api/dash/datepers', {
      nume: nume,
      tel: tel,
      dat: dataNaterii,
    })
      .then(res => {
        publish('doneInfos');
      })
  }


  return (
    <div className="card text-center">
        <div className="card-header mt-2">
            <QuestionMarkIcon color="secondary"/>Cine esti?<QuestionMarkIcon color="secondary"/>
        </div>
        <div className="card-body">
            <h3 className="card-title">Datele tale</h3>
            <h4 className="card-title">Introdu mai jos datele complete</h4>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                color ={fNume(nume).length < 2 ? "secondary" : "error" }
                helperText={fNume(nume)}
                id="numele" 
                label="Nume" 
                variant="standard"
                value={nume} 
                onChange={(event) => {
                      scrisNume = true;
                      setNume(clean(event.target.value, false));
                    }}/>
              <TextField
                color={fTel(tel).length < 2 ? "secondary" : "error" }
                helperText={fTel(tel)}
                id="tel"
                label="Telefon"
                variant="standard"
                value={tel}
                onChange={(event) => {
                      scrisTel = true;
                      setTel(event.target.value);
                    }}/>
              <LocalizationProvider dateAdapter={AdapterLuxon} locale="ro">
                <DatePicker
                  
                  disableFuture
                  label="Data nașterii"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  value={dataNaterii}
                  onChange={(newValue) => {
                    scrisDat = true;
                    setDataNaterii(newValue);
                  }}
                  renderInput={(params) => <TextField variant="standard" {...params} color={fData(dataNaterii).length < 2 ? "secondary" : "error" }
                  helperText={fData(dataNaterii)}/>}
                />
            </LocalizationProvider>
            </Box>
            <Button variant="outlined" color="secondary" disabled={!(scrisNume && scrisDat && scrisTel && eok(fNume(nume)) && eok(fTel(tel)) && eok(fData(dataNaterii)))} onClick={handleGata}>
                Gata
              </Button>
        </div>
        <div className="card-footer text-muted mb-2">
            Acestea vor fi folosite pentru a genera diplome si a tine evidenta membrilor
        </div>
    </div>
  )
}
