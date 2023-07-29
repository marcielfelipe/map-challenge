import { useState, useRef, useEffect,Fragment } from "react";
import { useDialog } from "@/contexts/dialog";
import { LeafletEvent, LeafletMouseEvent } from "leaflet";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  LayersControl,
  Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CreateAreaSchemaOutput, FormArea } from "../Form/FormArea";
const multiPolygon:[number,number][][] = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]
interface IMapLayer{
  id: number
  positions:[number,number][]
}

export default function Map() {
  const dialog = useDialog();

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
  function _onEditPath(e: LeafletEvent) {

  }
  function _onDeleted(e: LeafletEvent) {
    
    
  }
  function handleOpenDetails(e: LeafletMouseEvent) {
    const draw = e.layer;
    const areas: CreateAreaSchemaOutput[] = JSON.parse(
      localStorage.getItem("@map-challenge:areas") ?? "[]"
    );
    const areaDetails = areas.find((area) => area.drawId === Number(draw.options.attribution));
    console.log(areaDetails)
    dialog?.open({
      element: (
        <FormArea
          title={`Detalhes da área: ${draw.options.attribution}`}
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
  },[setMapLayers])

  return (
    <MapContainer
      center={[-23.5489, -46.6388]}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
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
          onEdited={_onEditPath}
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
        {mapLayers.map((layer) => (
            <Polygon 
              key={layer.id} 
              positions={layer.positions}  
              attribution={String(layer.id)}
            />
        ))}
      </FeatureGroup>

      
    </MapContainer>
  );
}
