import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Map(){
  return(
    <MapContainer center={[-23.5489,-46.6388]} zoom={7} style={{width:'100%',height:'100%'}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[-23.5489,-46.6388]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>

  )
}