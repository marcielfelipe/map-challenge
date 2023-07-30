import { useState, useEffect } from "react";
import { useDialog } from "@/contexts/dialog";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup, useMapEvents, useMap, useMapEvent } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CreateAreaSchemaOutput, FormArea, IDefaultValues } from "../FormArea";
import { toast } from "react-toastify";
import geocodeService from "@/services/geocode.service";
import { ICoordinates } from "@/services/types";
import { useLeafletContext } from "@react-leaflet/core";
import { getFormattedAddress } from '@/utils/getAddress';

interface IMapLayer {
  id: string;
  positions: [number, number][];
}

export default function Map() {
  const dialog = useDialog();
  const [mapLayers, setMapLayers] = useState<IMapLayer[]>([]);

  async function getAddress(coordinates: ICoordinates, reference: number) {
    toast.promise(
      geocodeService.getAddress(coordinates).then(({ data }) => {
        const address = data.results[0].address_components;
        var defaultValues:IDefaultValues = {
          ...getFormattedAddress(address),
          drawId: reference,
        };
        openFormArea(reference, defaultValues);
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

  async function openFormArea(
    reference: number,
    defaultValues: IDefaultValues
  ) {
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
      JSON.parse(localStorage.getItem("@map-challenge:polygons")!) || [];
    newMapLayers.push({
      id: draw._leaflet_id,
      positions: draw.getLatLngs()[0],
    });
    setMapLayers(newMapLayers);

    localStorage.setItem(
      "@map-challenge:polygons",
      JSON.stringify(newMapLayers)
    );
    getAddress(draw.getLatLngs()[0][0], draw._leaflet_id);
  }

  function onEdit(e: any) {
    const {
      layers: { _layers },
    } = e;

    const savedDraws: IMapLayer[] = JSON.parse(
      localStorage.getItem("@map-challenge:polygons") ?? "[]"
    );

    Object.values(_layers).map((layerToUpdate: any) => {
      savedDraws.map((savedDraw) => {
        if (savedDraw.id === layerToUpdate.options.attribution) {
          savedDraw.positions = layerToUpdate.getLatLngs()[0];
        }
      });
    });

    localStorage.setItem("@map-challenge:polygons", JSON.stringify(savedDraws));
    setMapLayers(savedDraws);
  }

  function _onDeleted(e: any) {
    const {
      layers: { _layers },
    } = e;
    const savedAreas: CreateAreaSchemaOutput[] = JSON.parse(
      localStorage.getItem("@map-challenge:areas") ?? "[]"
    );
    let newAreas: any;
    Object.values(_layers).map((layerToDelete: any) => {
      newAreas = savedAreas.filter(
        (area) => area.drawId !== layerToDelete.options.attribution
      );
    });
    localStorage.setItem("@map-challenge:areas", JSON.stringify(newAreas));

    const savedDraws: IMapLayer[] = JSON.parse(
      localStorage.getItem("@map-challenge:polygons") ?? "[]"
    );
    var newDraws: IMapLayer[] = [];
    Object.values(_layers).map((layerToDelete: any) => {
      newDraws = savedDraws.filter(
        (draw) => draw.id !== layerToDelete.options.attribution
      );
    });
    localStorage.setItem("@map-challenge:polygons", JSON.stringify(newDraws));
    setMapLayers(newDraws);
  }

  function handleOpenDetails(e: any) {
    const draw = e.layer;
    const areas: CreateAreaSchemaOutput[] = JSON.parse(
      localStorage.getItem("@map-challenge:areas") ?? "[]"
    );
    const areaDetails = areas.find(
      (area) => area.drawId === draw.options.attribution
    );
    dialog?.open({
      element: (
        <FormArea
          title={`Detalhes da área: ${draw.options.attribution}`}
          reference={draw.options.attribution}
          defaultValues={areaDetails}
          type="view"
        />
      ),
    });
  }

  useEffect(() => {
    const savedMapLayers: any[] =
      JSON.parse(localStorage.getItem("@map-challenge:polygons")!) || [];
    setMapLayers([...savedMapLayers]);
  }, []);

  const center: [number, number] = [-23.5489, -46.6388];

  return (
    <MapContainer
      center={center}
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

        {mapLayers.map((layer) => {
          return (
            <PolygonArea
              key={layer.id}
              id={layer.id}
              positions={layer.positions}
            />
          );
        })}
      </FeatureGroup>
    </MapContainer>
  );
}

interface IPolygonAreaProps {
  id: string;
  positions: [number, number][];
}
function PolygonArea(props: IPolygonAreaProps) {
  const context = useLeafletContext();
  const map = useMap()
  useEffect(() => {
    map.on('zoomend',()=>localStorage.setItem('zoom',map.getZoom().toString()))
    // map.on('moveend',()=>localStorage.setItem('view',map.getCenter().toString()))

    const polygon = L.polygon(props.positions, {
      attribution: props.id,
    }) as any;
    const container = context.layerContainer || context.map;
    container.addLayer(polygon);
    const zoom = Number(localStorage.getItem('zoom'))
    // const view = localStorage.getItem('view') as any
    // const regex = /-?\d+\.\d+/g;
    // const numbersArray = view.match(regex).map(Number) as any;
    // map.setView(numbersArray,zoom)
    map.setZoom(zoom)

    return () => {
      container.removeLayer(polygon);
    };
  });

  return null;
}
