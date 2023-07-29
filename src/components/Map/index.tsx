import { useDialog } from "@/contexts/dialog";
import {
  LeafletEvent,
  LeafletMouseEvent,
  LeafletMouseEventHandlerFn,
} from "leaflet";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { CreateAreaSchemaOutput, FormArea } from "../Form/FormArea";

export default function Map() {
  const dialog = useDialog();
  function _onCreate(e: LeafletEvent) {
    const draw = e.layer;
    dialog?.open({
          element: <FormArea title="Cadastrar área" reference={draw._leaflet_id} />,
    });
  }
  function _onEditPath(e: LeafletEvent) {
  }
  function _onDeleted(e: LeafletEvent) {
  }
  function handleOpenDetails(e: LeafletMouseEvent) {
    const draw = e.layer;
    const areas: CreateAreaSchemaOutput[] = JSON.parse(localStorage.getItem("@map-challenge:areas") ?? "[]")
    const areaDetails = areas.find(area =>area.drawId===draw._leaflet_id)
    dialog?.open({
      element: (
        <FormArea
          title={`Detalhes da área: ${draw._leaflet_id}`}
          reference={draw._leaflet_id}
          defaultValues={areaDetails}
        />
      ),
    });
  }
  return (
    <MapContainer
      center={[-23.5489, -46.6388]}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
    >
      <FeatureGroup
        eventHandlers={{
          click: (e) => handleOpenDetails(e),
        }}
      >
        <EditControl
          edit={{}}
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
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
