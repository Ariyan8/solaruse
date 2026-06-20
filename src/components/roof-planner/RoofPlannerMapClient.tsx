"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L, { LatLng, LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

type LocalPoint = {
  x: number;
  y: number;
};

type PanelStats = {
  count: number;
  panelArea: number;
  totalPanelArea: number;
  roofArea: number;
};

const MAP_CENTER: LatLngExpression = [35.7219, 51.3347];

const DEG_TO_RAD = Math.PI / 180;
const EARTH_METERS_PER_DEG_LAT = 111320;

// ابعاد تقریبی پنل استاندارد خورشیدی بر حسب متر
const PANEL_WIDTH = 1.13;
const PANEL_HEIGHT = 2.28;

// فاصله بین پنل‌ها بر حسب متر
const PANEL_GAP = 0.15;

// زاویه چیدمان پنل‌ها بر حسب درجه
// اگر خواستید پنل‌ها بچرخند، این عدد را تغییر دهید
const PANEL_ANGLE_DEG = 0;

function FixMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);

  return null;
}

function polygonAreaMeters(points: LocalPoint[]) {
  let area = 0;

  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;

    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }

  return Math.abs(area / 2);
}

function isPointInsidePolygon(point: LocalPoint, polygon: LocalPoint[]) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x <
        ((xj - xi) * (point.y - yi)) / ((yj - yi) || 0.0000001) + xi;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

function rotatePoint(point: LocalPoint, angleRad: number): LocalPoint {
  return {
    x: point.x * Math.cos(angleRad) - point.y * Math.sin(angleRad),
    y: point.x * Math.sin(angleRad) + point.y * Math.cos(angleRad),
  };
}

function getPolygonBounds(points: LocalPoint[]) {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  };
}

function createLatLngToLocalConverter(origin: LatLng) {
  const originLat = origin.lat;
  const originLng = origin.lng;

  const metersPerDegLng =
    EARTH_METERS_PER_DEG_LAT * Math.cos(originLat * DEG_TO_RAD);

  function latLngToLocal(latLng: LatLng): LocalPoint {
    return {
      x: (latLng.lng - originLng) * metersPerDegLng,
      y: (latLng.lat - originLat) * EARTH_METERS_PER_DEG_LAT,
    };
  }

  function localToLatLng(point: LocalPoint): LatLng {
    return L.latLng(
      originLat + point.y / EARTH_METERS_PER_DEG_LAT,
      originLng + point.x / metersPerDegLng
    );
  }

  return {
    latLngToLocal,
    localToLatLng,
  };
}

function generateSolarPanelsInsidePolygon(options: {
  polygonLatLngs: LatLng[];
  panelWidth: number;
  panelHeight: number;
  gap: number;
  angleDeg: number;
}) {
  const { polygonLatLngs, panelWidth, panelHeight, gap, angleDeg } = options;

  const polygon = L.polygon(polygonLatLngs);
  const center = polygon.getBounds().getCenter();

  const { latLngToLocal, localToLatLng } =
    createLatLngToLocalConverter(center);

  const polygonLocal = polygonLatLngs.map((latLng) => latLngToLocal(latLng));

  const roofArea = polygonAreaMeters(polygonLocal);

  const angleRad = angleDeg * DEG_TO_RAD;

  // پلیگون را برعکس زاویه پنل می‌چرخانیم تا تولید شبکه ساده شود
  const rotatedPolygon = polygonLocal.map((p) => rotatePoint(p, -angleRad));

  const bounds = getPolygonBounds(rotatedPolygon);

  const stepX = panelWidth + gap;
  const stepY = panelHeight + gap;

  const panels: LatLng[][] = [];

  const startX = bounds.minX - stepX;
  const endX = bounds.maxX + stepX;
  const startY = bounds.minY - stepY;
  const endY = bounds.maxY + stepY;

  for (let y = startY; y <= endY; y += stepY) {
    for (let x = startX; x <= endX; x += stepX) {
      const panelRectRotated: LocalPoint[] = [
        { x, y },
        { x: x + panelWidth, y },
        { x: x + panelWidth, y: y + panelHeight },
        { x, y: y + panelHeight },
      ];

      const panelCenter: LocalPoint = {
        x: x + panelWidth / 2,
        y: y + panelHeight / 2,
      };

      // برای اینکه پنل از محدوده بام بیرون نزند، چهار گوشه و مرکز را چک می‌کنیم
      const testPoints = [...panelRectRotated, panelCenter];

      const isInside = testPoints.every((point) =>
        isPointInsidePolygon(point, rotatedPolygon)
      );

      if (!isInside) {
        continue;
      }

      // برگرداندن پنل‌ها به زاویه اصلی
      const panelRectOriginal = panelRectRotated.map((point) =>
        rotatePoint(point, angleRad)
      );

      const panelLatLngs = panelRectOriginal.map((point) =>
        localToLatLng(point)
      );

      panels.push(panelLatLngs);
    }
  }

  return {
    panels,
    stats: {
      count: panels.length,
      panelArea: panelWidth * panelHeight,
      totalPanelArea: panels.length * panelWidth * panelHeight,
      roofArea,
    },
  };
}

function DrawingTools({
  onStatsChange,
}: {
  onStatsChange: (stats: PanelStats | null) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    const roofLayer = new L.FeatureGroup();
    const panelsLayer = new L.FeatureGroup();

    map.addLayer(drawnItems);
    map.addLayer(roofLayer);
    map.addLayer(panelsLayer);

    const drawControl = new L.Control.Draw({
      position: "topleft",
      draw: {
        marker: false,
        circle: false,
        circlemarker: false,
        polyline: false,
        rectangle: false,
        polygon: {
          allowIntersection: false,
          showArea: true,
          shapeOptions: {
            color: "#00AEEF",
            weight: 3,
            fillColor: "#00AEEF",
            fillOpacity: 0.15,
          },
        },
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: true,
      },
    });

    map.addControl(drawControl);

    const handleCreated = (event: any) => {
      const layer = event.layer as L.Polygon;

      drawnItems.clearLayers();
      roofLayer.clearLayers();
      panelsLayer.clearLayers();

      drawnItems.addLayer(layer);

      const latLngs = layer.getLatLngs()[0] as LatLng[];

      if (!latLngs || latLngs.length < 3) {
        return;
      }

      const { panels, stats } = generateSolarPanelsInsidePolygon({
        polygonLatLngs: latLngs,
        panelWidth: PANEL_WIDTH,
        panelHeight: PANEL_HEIGHT,
        gap: PANEL_GAP,
        angleDeg: PANEL_ANGLE_DEG,
      });

      const roofPolygon = L.polygon(latLngs, {
        color: "#00AEEF",
        weight: 3,
        fillColor: "#00AEEF",
        fillOpacity: 0.12,
      });

      roofLayer.addLayer(roofPolygon);

      panels.forEach((panelLatLngs) => {
        const panelPolygon = L.polygon(panelLatLngs, {
          color: "#0F172A",
          weight: 1,
          fillColor: "#2563EB",
          fillOpacity: 0.75,
        });

        panelsLayer.addLayer(panelPolygon);
      });

      onStatsChange(stats);
    };

    const handleDeleted = () => {
      drawnItems.clearLayers();
      roofLayer.clearLayers();
      panelsLayer.clearLayers();
      onStatsChange(null);
    };

    map.on(L.Draw.Event.CREATED, handleCreated);
    map.on(L.Draw.Event.DELETED, handleDeleted);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.off(L.Draw.Event.DELETED, handleDeleted);

      map.removeControl(drawControl);

      map.removeLayer(drawnItems);
      map.removeLayer(roofLayer);
      map.removeLayer(panelsLayer);
    };
  }, [map, onStatsChange]);

  return null;
}

export default function RoofPlannerMapClient() {
  const [stats, setStats] = useState<PanelStats | null>(null);

  return (
    <div style={{ height: "600px", width: "100%", position: "relative" }}>
      <MapContainer
        center={MAP_CENTER}
        zoom={18}
        maxZoom={24}
        style={{ height: "100%", width: "100%" }}
      >
        <FixMap />

        <DrawingTools onStatsChange={setStats} />

        <TileLayer
          attribution="Esri Satellite"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxNativeZoom={19}
          maxZoom={24}
        />
      </MapContainer>

      {stats && (
        <div
          style={{
            position: "absolute",
            right: "12px",
            bottom: "12px",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.94)",
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            padding: "12px 14px",
            minWidth: "230px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
            fontSize: "13px",
            lineHeight: 1.8,
            direction: "rtl",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "4px" }}>
            نتیجه چیدمان پنل‌ها
          </div>

          <div>
            تعداد پنل: <strong>{stats.count}</strong>
          </div>

          <div>
            مساحت بام: <strong>{stats.roofArea.toFixed(2)}</strong> متر مربع
          </div>

          <div>
            مساحت هر پنل: <strong>{stats.panelArea.toFixed(2)}</strong> متر مربع
          </div>

          <div>
            مساحت کل پنل‌ها:{" "}
            <strong>{stats.totalPanelArea.toFixed(2)}</strong> متر مربع
          </div>

          <div>
            پوشش بام:{" "}
            <strong>
              {stats.roofArea > 0
                ? ((stats.totalPanelArea / stats.roofArea) * 100).toFixed(1)
                : "0"}
              %
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}
