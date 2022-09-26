import React from 'react'
import { useEffectOnce } from 'usehooks-ts';
import {init, focus, typeIt, moveIt} from '../components/terminal/in'
import { authProps } from '../libs/autorizare';

export default function Terminal({pageProps}) {

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

export async function getServerSideProps(context) {
    const [user, ses, perm] = await authProps(context);
  
    if(!!user){
      return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
          ses: ses,
          perm: perm,
        },
      }
    }else{
      return {
        props: {
          user: {},
          ses: ses,
          perm: perm,
        },
      }
    }
  }
