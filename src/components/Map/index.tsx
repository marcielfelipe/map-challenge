import { useDialog } from '@/contexts/dialog';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
export default function Map(){
  const dialog = useDialog()
  function _onCreate(e:any){
    console.log(e);
    dialog?.open({
      element:<div>
        <p>opa</p>
      </div>,
    })
  }
  function _onEditPath(e:any){
    console.log(e);

  }
  function _onDeleted(e:any){
    console.log(e);

  }
  return(
    <MapContainer 
      center={[-23.5489,-46.6388]} 
      zoom={7} 
      style={{width:'100%',height:'100%'}}
    >
      <FeatureGroup>
          <EditControl
            position='topright'
            onEdited={_onEditPath}
            onCreated={_onCreate}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false
            }}
          />
        </FeatureGroup>
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