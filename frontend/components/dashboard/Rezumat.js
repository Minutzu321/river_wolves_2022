import React, { useEffect, useState } from 'react'



import { useInterval } from 'usehooks-ts'

import { saptziluna } from '../../libs/data';

export default function Rezumat() {

    const [salut, setSalut] = useState("");
    const [dat, setDat] = useState("");

    const hello = () => {
        let azi = new Date();
  
        setDat("Azi - "+saptziluna(azi))
  
        if(azi.getHours() < 3){
          setSalut("Noapte buna!")
        }else if(azi.getHours() < 12){
          setSalut("Neata!")
        }else if(azi.getHours() < 18){
          setSalut("Salut!")
        }else if(azi.getHours() < 22){
          setSalut("Buna seara!")
        }else{
          setSalut("Noapte buna!")
        }
    }
  
    useEffect(() => {
      hello();
    }, [])
    
  
    useInterval(
      () => {
        hello();
      },
      5000,
    )

  return (
    <div className="card text-center">
        <div className="card-header mt-2">
            {salut}
        </div>
        <div className="card-body">
            <h4 className="card-title">Rezumatul zilei de azi</h4>
            <p className="card-text">3 sedinte, 8 taskuri de indeplinit in total</p>
            <a href="#" className="btn btn-primary">Vezi sedintele urmatoare</a>
        </div>
        <div className="card-footer text-muted mb-2">
            {dat}
        </div>
    </div>
  )
}
