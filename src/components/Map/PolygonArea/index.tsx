import { useLeafletContext } from '@react-leaflet/core';
import { useEffect } from 'react';
import L from "leaflet";
interface IPolygonAreaProps {
  id: string;
  positions: [number, number][];
}

export function PolygonArea(props: IPolygonAreaProps) {
  const context = useLeafletContext();
  useEffect(() => {

    const polygon = L.polygon(props.positions, {
      attribution: props.id,
    }) as any;
    const container = context.layerContainer || context.map;
    container.addLayer(polygon);

    return () => {
      container.removeLayer(polygon);
    };
  });

  return null;
}