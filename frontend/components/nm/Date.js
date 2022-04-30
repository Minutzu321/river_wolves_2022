import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Cookies from 'universal-cookie';

export default function Date({fetchUser, snack}) {

    const cookies = new Cookies();

    const [nume, setNume] = useState("");
    const [tel, setTel] = useState("");

    const salveaza = async () => {
        if(!nume.trim() || nume.trim().length < 3 || nume.trim().split(" ").length < 2 || nume.trim().split(" ")[0].length < 2 || nume.trim().split(" ")[1].length < 2){
            snack("Trebuie să pui numele complet.")
            return;
        }

        if(!tel.trim() || tel.trim().match(/\d/g).length!=10 || !tel.trim().startsWith("07")){
            snack("Numărul de telefon nu este valid.")
            return;
          }

        const trimite = {
            c: cookies.get('riverwolves_cod_noaptea_muzeelor'),
            nume: nume.trim(),
            tel: tel.trim()
        }

        fetch('/api/th/salveaza_profil_api', {
            method: 'POST',
            body: JSON.stringify(trimite)
          }).then((raspuns) => {
            if(raspuns.ok){
              let rj = raspuns.json().then((rj) => {
                if(rj.succes){
                  fetchUser();
                }else{
                  snack("Deja există cineva înregistrat cu acest nume!")
                }
              });
            }else{
              snack("Eroare la server! Verificati conexiunea!");
            }
        });
        
    }
    
    
  return (
    <>
        <Image src="/sponsori/icem.jpg" width={1310} height={500}/>
        <div className="card-header mt-2">
                Noaptea muzeelor, 2022
        </div>
        <div className="card-body">
            <h4 className="card-title">Pentru a începe, vă rugăm să completați datele de contact mai jos.</h4>
            <p className="card-text">Datele dumneavoastră nu vor fi împărtășite cu nimeni, acestea urmând să fie șterse după premierea câștigătorilor</p>
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
                <TextField id="outlined-basic" label="Numele" variant="outlined" value={nume} onChange={e => setNume(e.target.value)} onKeyPress={(e) => {if(e.key === 'Enter') {e.preventDefault();}}}/>
                <TextField id="outlined-basic" label="Numărul de telefon" variant="outlined" type="number" value={tel} onChange={e => setTel(e.target.value)} onKeyPress={(e) => {if(e.key === 'Enter') {e.preventDefault(); salveaza();}}}/>
                <Button variant="outlined" onClick={salveaza}>
                    Trimite
                </Button>
              </form>
            </Stack>
        </div>
        <div className="card-footer text-muted mb-2 text-danger">
            Toate donațiile for fi trimise către UNICEF în scopul sprijinirii combaterii crizei umanitare actuale.
        </div>
    </>
  )
}
