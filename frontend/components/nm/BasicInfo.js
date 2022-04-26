import React from 'react'
import { QrReader } from 'react-qr-reader';

import Button from '@mui/material/Button';
import { Avatar, Chip } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

export default function BasicInfo({scan, setScan, user, handleResult, fetchDonatii, donatii}) {
  return (
    <div className="card text-center">
        <div className="card-header mt-2">
            <Chip color="secondary" avatar={<Avatar src="/rw-avatar.png" />} label="Eveniment marca River Wolves"/>
        </div>
        <div className="card-header mt-2">
                Căutare de comori în Noaptea Muzeelor
        </div>
        <div className="card-body">
            <h4 className="card-title">Bine ați venit la Noaptea Muzeelor!</h4>
            <p className="card-text">Pentru a începe căutarea de comori, vă rugăm să găsiți cea mai apropiată stație de voluntari(la intrarea oricărui muzeu) și să scanați codul oferit de aceștia.</p>
            {scan && <QrReader
                constraints={{facingMode: 'environment'}}
                scanDelay={2000}
                onResult={(result)=>{handleResult(result)}}
                containerStyle={{ maxWidth: "500px", margin: "auto"}}
            />}
                <Button variant="contained" color="success" onClick={() => setScan(!scan)}>
                    Scanați codul
                </Button>
        </div>
        <div className="card-footer text-muted mb-2 text-danger">
            Donație minimă: 5 lei
        </div>
        {!!donatii && <div className="card-footer text-muted mb-2">
            Donații strânse: <VolunteerActivismIcon/> {donatii} lei
        </div>}
        <div className="card-footer text-muted mb-2 text-danger">
            Toate donațiile for fi trimise către UNICEF în scopul sprijinirii combaterii crizei umanitare actuale.
        </div>
    </div>
  )
}
