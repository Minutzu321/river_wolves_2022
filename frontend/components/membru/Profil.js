import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchData } from 'next-auth/client/_utils';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';


export default function Profil({data, refData}) {

  const router = useRouter();
  
  const [dataNaterii, setDataNaterii] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [titlu, setTitlu] = useState("")
  const [mesaj, setMesaj] = useState("")
  const [refresh, setRefresh] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!event.target.nume.value || event.target.nume.value.length < 4){
      setRefresh(false)
      setOpen(true);
      setTitlu("Eroare")
      setMesaj("Numele nu este valid.")
      return;
    }
    if(!event.target.tel.value || event.target.tel.value.match(/\d/g).length!=10){
      setRefresh(false)
      setOpen(true);
      setTitlu("Eroare")
      setMesaj("Numărul de telefon nu este valid.")
      return;
    }


    const isDate = (date) => {
      return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
    }
    if(!dataNaterii || !isDate(dataNaterii)){
      setRefresh(false)
      setOpen(true);
      setMesaj("Data nașterii nu este validă.")
      return;
    }
    function calculateAge() {
      var ageDifMs = Date.now() - dataNaterii;
      var ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    if(calculateAge() < 13){
      setRefresh(false)
      setOpen(true);
      setMesaj("Nu poți să ai "+calculateAge()+" ani")
      return;
    }
    console.log(dataNaterii);
    const raspuns = await fetch('/api/membri/profil_api', {
      method: 'POST',
      body: JSON.stringify({
        nume: event.target.nume.value,
        data_nastere: dataNaterii.toJSON(),
        tel: event.target.tel.value
      })
    });

    if(raspuns.ok){
      setRefresh(true)
      setOpen(true);
      setTitlu("Date salvate")
      setMesaj("Datele au fost salvate cu succes!")
    }else{
      setRefresh(false)
      setOpen(true);
      setTitlu("Eroare")
      setMesaj("A apărut o eroare la server. Încearcă mai târziu.")
    }
    
  }

  const handleClose = () => {
    setOpen(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
        <h2>Profilul tău</h2>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {titlu}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {mesaj}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {refresh ? (<Button onClick={refreshPage} autoFocus>Click ca sa dai refresh la pagina</Button>)
            :(<Button onClick={handleClose} autoFocus>Ok</Button>)}
          </DialogActions>
        </Dialog>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nume">Numele tău complet</label>
            <input name="nume" type="text" className="form-control" id="nume" aria-describedby="numeHelp" placeholder="Numele complet"/>
            <small id="numeHelp" className="form-text text-muted">Va fi folosit pentru diplome, deci trebuie să fie cu diacritice și linii, dacă este cazul.</small>
          </div>
          <br/>
          <div className="form-group">
            <LocalizationProvider dateAdapter={AdapterLuxon} locale="ro">
                <DatePicker
                  disableFuture
                  label="Data nașterii"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  value={dataNaterii}
                  onChange={(newValue) => {
                    setDataNaterii(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </div>
          <br/>
          <div className="form-group">
            <label htmlFor="telefon">Numărul tău de telefon</label>
            <input name="tel" type="number" className="form-control" id="telefon" aria-describedby="telHelp" placeholder="Numărul de telefon"/>
          </div>

          
          <button type="submit" className="btn btn-primary">Salvează</button>
        </form>
    </>
  )
}
