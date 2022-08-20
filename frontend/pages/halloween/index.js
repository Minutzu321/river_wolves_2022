import React, { Suspense } from 'react'
import { Canvas } from "@react-three/fiber";
import css from "../styles/THHome.module.css";
import Camera from '../../components/Render/Camera';
import Bec from '../../components/Render/Bec';
import OrbitControls from '../../components/Render/OrbitControls'

export default function THHome() {
  return (
    <div className={css.scene}>
      <Canvas
        shadows={true}
        className={css.canvas}
        camera={{
          position: [0, 50, -300],
          rotation: [Math.PI / 2, 0, 0],
        }}
      >
        <OrbitControls />
        <Bec position={[0, 0, -250]} />
        <Suspense fallback={null}>
          <Camera position={[0, 0, 0]}/>
        </Suspense>
        
      </Canvas>
    </div>
  );
}
