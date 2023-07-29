import { useState, useRef, useEffect, Fragment } from "react";
import { useDialog } from "@/contexts/dialog";
import { LeafletEvent, LeafletMouseEvent } from "leaflet";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  GeoJSON,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CreateAreaSchemaOutput, FormArea } from "../Form/FormArea";
import axios from "axios";

interface IMapLayer {
  id: number;
  positions: [number, number][];
}

export default function Map() {
  const dialog = useDialog();
  const mapRef = useRef(null);
  const [mapLayers, setMapLayers] = useState<IMapLayer[]>([]);

  async function getAddress(coordinates:{lat:number,lng:number}){
    const geocodeApiUrl = `
      https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}
      &key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
    axios
      .get(geocodeApiUrl)
      .then((response) => {
        if (response.data.results.length > 0) {
          return  response.data.results[0];
        }
      })
      .catch((error) => {
        console.error("Erro ao obter dados de geocodificação:", error);
        return null
      })
  }
  async function openFormArea(reference:number, coordinates:{lat:number,lng:number}){
    const address = await getAddress(coordinates)

    console.log(address)
    dialog?.open({
      element: (
        <FormArea
          title="Cadastrar área"
          reference={reference}
          type="create"
        />
      ),
    });

  }

  function _onCreate(e: any) {
    const draw = e.layer;
    const newMapLayers =
      JSON.parse(localStorage.getItem("drawnPolygons")!) || mapLayers;
    newMapLayers.push({
      id: draw._leaflet_id,
      positions: draw.getLatLngs()[0],
    });
    setMapLayers(newMapLayers);
    
    localStorage.setItem("drawnPolygons", JSON.stringify(newMapLayers));

    openFormArea(draw._leaflet_id,draw.getLatLngs()[0][0])
  }
    


  function onEdit(e: LeafletEvent) {}
  function _onDeleted(e: any) {
    const {
      layers: { _layers },
    } = e;
    console.log(_layers);
  }

  function handleOpenDetails(e: LeafletMouseEvent) {
    const draw = e.layer;
    const areas: CreateAreaSchemaOutput[] = JSON.parse(
      localStorage.getItem("@map-challenge:areas") ?? "[]"
    );
    const areaDetails = areas.find((area) => area.drawId === draw._leaflet_id);
    console.log(areaDetails);
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
  const handleGeocode = async(coordinates: { lat: number; lng: number }) => {
    const geocodeApiUrl = `
      https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}
      &key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
    axios
      .get(geocodeApiUrl)
      .then((response) => {
        if (response.data.results.length > 0) {
          return response.data.results[0].formatted_address;
        }
      })
      .catch((error) => {
        console.error("Erro ao obter dados de geocodificação:", error);
      });
  };

  useEffect(() => {
    const savedMapLayers =
      JSON.parse(localStorage.getItem("drawnPolygons")!) || [];
    setMapLayers([...savedMapLayers]);
  }, []);

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
