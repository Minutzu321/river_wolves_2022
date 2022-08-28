import React, { useRef } from "react";
import { SpotLightHelper } from "three";


import { OrbitControls, Plane, TorusKnot, useHelper, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function Bec(props) {
  const lumiRef = useRef();
  const intensitate = useRef(0);
  const scade = useRef(false);
  // useHelper(lumiRef, SpotLightHelper, "blue");
  useFrame((state, delta) => {
    if(!scade.current){
      if(intensitate.current >= 0){
        
        if(Math.floor(Math.random() * 1000) < 2000 * delta){
          intensitate.current -= Math.random();
        }
        lumiRef.current.intensity = intensitate.current;
      }else{
        lumiRef.current.intensity = 0;
      }
      intensitate.current += 1.50 * delta;
      if(intensitate.current > 1.5){
        scade.current = true;
      }
  }else{
    if(intensitate.current > 1){
      intensitate.current = 1;
    }
    if(intensitate.current > -1){
      intensitate.current -= 10.00 * delta;
      lumiRef.current.intensity = intensitate.current;
    }else{
      scade.current = false;
    }
  }
  })
  return (
    <mesh {...props} >
       <spotLight angle={Math.PI/4} penumbra={1} ref={lumiRef}/>
    </mesh>
  );
}

export default Bec;
