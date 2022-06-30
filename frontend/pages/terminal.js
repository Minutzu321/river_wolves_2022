import React from 'react'
import {init, focus, typeIt, moveIt} from '../components/terminal/in'

import useEffectOnce from '../libs/useonce'

export default function Terminal() {

    useEffectOnce(()=>{
        init();
    })

  return (
    <div className='bod'>
        <div id="terminal" onClick={focus}>
            <a id="before"></a>
        </div>
        <div id="comanda" onClick={focus}>
        <textarea
            type="text"
            id="texter"
            onKeyUp={(event)=>{typeIt(event);}}
            onKeyDown={(event)=>{typeIt(event); moveIt(event)}}
            onKeyPress={(event)=>{typeIt(event);}}
            autoFocus
        ></textarea>
        <div id="ecran" onClick={focus}>
            <span id="typer"></span><b className="cursor" id="cursor">█</b>
        </div>
        </div>
    </div>
  )
}
