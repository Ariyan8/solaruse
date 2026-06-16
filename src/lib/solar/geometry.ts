import L from "leaflet";

export type Point = { lat: number; lng: number };

export function metersBetween(a: Point, b: Point) {
  return L.latLng(a.lat, a.lng).distanceTo(L.latLng(b.lat, b.lng));
}

export function meterOffsetsToLatLng(
  origin: Point,
  dx: number,
  dy: number
): Point {
  const dLat = dy / 111320;
  const dLng = dx / (111320 * Math.cos(origin.lat * Math.PI / 180));

  return {
    lat: origin.lat + dLat,
    lng: origin.lng + dLng,
  };
}

export function pointInPolygon(point: Point, polygon: Point[]) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    const intersect =
      yi > point.lat !== yj > point.lat &&
      point.lng <
        ((xj - xi) * (point.lat - yi)) / (yj - yi + 1e-9) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}
