"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";

function FixMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);

  return null;
}

export default function RoofPlannerMapClient() {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer
        center={[35.7219, 51.3347]}
        zoom={18}
        maxZoom={24}   // اجازه زوم بیشتر
        style={{ height: "100%", width: "100%" }}
      >
        <FixMap />

        <TileLayer
          attribution="Esri Satellite"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxNativeZoom={19}  // آخرین زوم واقعی tile
          maxZoom={24}        // بعد از آن Leaflet خودش بزرگ می‌کند
        />
      </MapContainer>
    </div>
  );
}
