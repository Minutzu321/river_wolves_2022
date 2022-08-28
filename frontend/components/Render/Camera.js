import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader, RepeatWrapping, MirroredRepeatWrapping } from "three";

function useMaterial(textura){

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTextures(textura)

  return <meshStandardMaterial
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          />
}

function useTextures(textura){
  const texturi = setMapping(useLoader(TextureLoader, [
    '/texturi/'+textura+'/color.jpg',
    '/texturi/'+textura+'/displacement.jpg',
    '/texturi/'+textura+'/normal.jpg',
    '/texturi/'+textura+'/roughness.jpg',
    '/texturi/'+textura+'/ao.jpg',
  ]));
  return texturi
}

function setMapping(textures){
    textures.forEach((texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.offset.set( 0, 0 );
        texture.repeat.set( 6, 6);
    })
    return textures;
}

function Camera(props) {
    
  const matPerete = useMaterial("perete_piatra");
  const matJos = useMaterial("podea_piatra");
    
  return (
    <group>
      <mesh {...props} recieveShadow={true} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[500,500]}/>
        {matPerete}
      </mesh>
      <mesh {...props} recieveShadow={true} rotation={[Math.PI/2, Math.PI, 0]} position={[0,-5,0]}>
        <planeGeometry args={[500,500]} />
        {matJos}
      </mesh>
    </group>
    
    
  );
}

export default Camera;