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
import { toast } from 'react-toastify';
import geocodeService from '@/services/geocode.service';
import { ICoordinates } from '@/services/types';

interface IMapLayer {
  id: number;
  positions: [number, number][];
}

export default function Map() {
  const dialog = useDialog();
  const mapRef = useRef(null);
  const [mapLayers, setMapLayers] = useState<IMapLayer[]>([]);

  async function getAddress(coordinates:ICoordinates,reference:number){
    toast.promise(
      geocodeService.getAddress(coordinates).then(({data}) => {
        const firstAddress = data.results[0]
        const defaultValues:CreateAreaSchemaOutput={
          street:`${firstAddress.address_components[1]?.long_name}, ${firstAddress.address_components[0]?.long_name}`,
          district: firstAddress.address_components[2]?.long_name,
          city: firstAddress.address_components[3]?.long_name,
          state:firstAddress.address_components[4]?.long_name,
          country: firstAddress.address_components[5]?.long_name,
          name:'',
          nameArea:'',
          drawId:reference
        }
        openFormArea(reference,defaultValues)
      }),
      {
        pending: `Buscando endereço...`,
        success: {
          render() {
            return `Endereço encontrado.`;
          },
        },
        error: "Erro ao buscar endereço.",
      }
    );
  }
  async function openFormArea(reference:number,defaultValues:CreateAreaSchemaOutput){
    dialog?.open({
      element: (
        <FormArea
          title="Cadastrar área"
          reference={reference}
          defaultValues={defaultValues}
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
    getAddress(draw.getLatLngs()[0][0],draw._leaflet_id)
  }
    


  function onEdit(e: LeafletEvent) {}
  function _onDeleted(e: any) {
    const {
      layers: { _layers },
    } = e;
  }

  function handleOpenDetails(e: LeafletMouseEvent) {
    const draw = e.layer;
    const areas: CreateAreaSchemaOutput[] = JSON.parse(
      localStorage.getItem("@map-challenge:areas") ?? "[]"
    );
    const areaDetails = areas.find((area) => area.drawId === draw._leaflet_id);
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
