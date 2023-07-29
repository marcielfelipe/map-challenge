import { useState, useRef, useEffect,Fragment } from "react";
import { useDialog } from "@/contexts/dialog";
import { LeafletEvent, LeafletMouseEvent } from "leaflet";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CreateAreaSchemaOutput, FormArea } from "../Form/FormArea";

interface IMapLayer{
  id: number
  positions:[number,number][]
}

export default function Map() {
  const dialog = useDialog();
  const mapRef = useRef(null)

  const [mapLayers, setMapLayers] = useState<IMapLayer[]>([]);

  function _onCreate(e:any) {
    const draw = e.layer;
    const newMapLayers = JSON.parse(localStorage.getItem('drawnPolygons')!)||mapLayers
    newMapLayers.push({id:draw._leaflet_id, positions: draw.getLatLngs()[0]})

    setMapLayers(newMapLayers)

    localStorage.setItem('drawnPolygons',JSON.stringify(newMapLayers));

    dialog?.open({
      element: (
        <FormArea
          title="Cadastrar área"
          reference={draw._leaflet_id}
          type="create"
        />
      ),
    });
  }
  function onEdit(e: LeafletEvent) {
    
  }
  function _onDeleted(e: any) {
    const {layers:{_layers}} = e
    console.log(_layers)
  }
  
  function handleOpenDetails(e: LeafletMouseEvent) {
    const draw = e.layer;
    const areas: CreateAreaSchemaOutput[] = JSON.parse(
      localStorage.getItem("@map-challenge:areas") ?? "[]"
    );
    const areaDetails = areas.find((area) => area.drawId === draw._leaflet_id);
    console.log(areaDetails)
    dialog?.open({
      element: (
        <FormArea
          title={`Detalhes da área: ${draw._leaflet_id}`}
          reference={draw._leaflet_id}
          defaultValues={areaDetails}
          type="view"
        />
      ),
    });
  }

  useEffect(()=>{
    const savedMapLayers = JSON.parse(localStorage.getItem('drawnPolygons')!)||[]
    setMapLayers([...savedMapLayers])
  },[])

  return (
    <MapContainer
      center={[-23.5489, -46.6388]}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         
      />
      <FeatureGroup
        eventHandlers={{
          click: (e) => handleOpenDetails(e),
        }}
        

      >
        <EditControl
          position="topright"
          onEdited={onEdit}
          onCreated={_onCreate}
          onDeleted={_onDeleted}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
          onDeleteStart={() => console.log("start deleting")}
          onDeleteStop={() => console.log("stop deleting")}
        />
        {/* {mapLayers.map((layer) => (
            <Polygon 
              key={layer.id} 
              positions={layer.positions}  
              attribution={String(layer.id)}
            />
        ))} */}
      </FeatureGroup>

      
    </MapContainer>
  );
}