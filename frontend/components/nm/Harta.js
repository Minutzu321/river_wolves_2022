import React, { useState, useRef } from "react";
import Map, {Marker, MapRef} from "react-map-gl";


const Harta = ({coords}) => {
    return <Map
    initialViewState={{
      latitude: 45.179700,  
      longitude: 28.804523,
      zoom: 13
    }}
    style={{width: '100%', height: 300, margin: 'auto'}}
    mapboxAccessToken="pk.eyJ1IjoiY2hpcnVzbWluYSIsImEiOiJjbDJjNGJyZG8wbHdvM2NzYzJtd3NnZmRsIn0.pnRuGmti0bro1wnOQf3RwQ"
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
      <Marker longitude={coords[1]} latitude={coords[0]} anchor="bottom" >
      </Marker>
</Map>
}

export default Harta;