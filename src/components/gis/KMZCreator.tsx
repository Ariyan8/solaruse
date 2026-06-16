"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import proj4 from "proj4";
import JSZip from "jszip";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";

type RowType = {
  x: string;
  y: string;
};

type LatLngWithUTM = {
  lat: number;
  lng: number;
  utmX: string;
  utmY: string;
};

function makeJalaliTimestampSlug() {
  const d = new Date();

  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(d);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";

  const toEn = (s: string) =>
    s.replace(/[۰-۹]/g, (ch) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(ch)));

  return `${toEn(get("year"))}-${toEn(get("month"))}-${toEn(
    get("day")
  )}_${toEn(get("hour"))}-${toEn(get("minute"))}-${toEn(get("second"))}`;
}

function safeDownloadBlob(blob: Blob, filename: string) {
  if (typeof window === "undefined") return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const customDivIcon = L.divIcon({
  html: `<div style="
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: white;
    border: 1px solid black;
  "></div>`,
  className: "",
  iconSize: [8, 8],
  iconAnchor: [4, 4],
});

function FitBounds({ latlngs }: { latlngs: LatLngWithUTM[] }) {
  const map = useMap();

  useEffect(() => {
    if (latlngs.length === 0) return;

    const bounds = L.latLngBounds(
      latlngs.map((p) => [p.lat, p.lng] as [number, number])
    );

    map.fitBounds(bounds, { padding: [60, 60] });
  }, [latlngs, map]);

  return null;
}

export default function KMZCreator() {
  const [mounted, setMounted] = useState(false);
  const [zone, setZone] = useState("39");

  const [rows, setRows] = useState<RowType[]>([
    { x: "", y: "" },
    { x: "", y: "" },
    { x: "", y: "" },
    { x: "", y: "" },
    { x: "", y: "" },
  ]);

  const [latlngs, setLatlngs] = useState<LatLngWithUTM[]>([]);
  const [area, setArea] = useState(0);
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(
    null
  );
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const mapWrapperRef = useRef<HTMLDivElement | null>(null);

  const mapRenderer = useMemo(() => L.canvas(), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // اتوماتیک سازی بروزرسانی
  const processPoints = useMemo(() => () => {
    if (validRows.length < 1) {
      setLatlngs([]);
      setArea(0);
      setSelectedPointIndex(null);
      return;
    }

    try {
      const utmProj = `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs`;

      const converted = validRows.map((pt) => {
        const [lng, lat] = proj4(utmProj, "WGS84", [
          parseFloat(pt.x),
          parseFloat(pt.y),
        ]);

        return {
          lat,
          lng,
          utmX: pt.x,
          utmY: pt.y,
        };
      });

      setLatlngs(converted);

      if (validRows.length >= 3) {
        let sum = 0;

        for (let i = 0; i < validRows.length; i++) {
          const j = (i + 1) % validRows.length;

          sum +=
            parseFloat(validRows[i].x) * parseFloat(validRows[j].y) -
            parseFloat(validRows[j].x) * parseFloat(validRows[i].y);
        }

        setArea(Math.abs(sum) / 2);
      } else {
        setArea(0);
      }

      setSelectedPointIndex(null);
    } catch {
      // خطا را در کنسول میگذاریم تا تجربه کاربری روان باشد
      console.error("خطا در تبدیل مختصات");
    }
  }, [zone, rows]);

  // اجرای اتوماتیک با تغییر ورودی‌ها
  useEffect(() => {
    processPoints();
  }, [processPoints]);

  const updateRow = (index: number, field: "x" | "y", value: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const validRows = useMemo(() => {
    return rows.filter(
      (r) =>
        r.x.trim() !== "" &&
        r.y.trim() !== "" &&
        !isNaN(Number(r.x)) &&
        !isNaN(Number(r.y))
    );
  }, [rows]);

  const mapCenter = useMemo(() => {
    if (latlngs.length === 0) return { lat: 35.699739, lng: 51.337067 };

    const avgLat = latlngs.reduce((s, p) => s + p.lat, 0) / latlngs.length;
    const avgLng = latlngs.reduce((s, p) => s + p.lng, 0) / latlngs.length;

    return { lat: avgLat, lng: avgLng };
  }, [latlngs]);

  const exportExcel = () => {
    if (validRows.length === 0) return;

    const ts = makeJalaliTimestampSlug();

    const ws = XLSX.utils.json_to_sheet(
      validRows.map((r, i) => ({
        ردیف: i + 1,
        X: r.x,
        Y: r.y,
        Zone: zone,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Points");
    XLSX.writeFile(wb, `Points_${ts}.xlsx`);
  };

  const exportKMZ = async () => {
    if (latlngs.length < 3) return;

    const ts = makeJalaliTimestampSlug();

    const utmList = latlngs.map((pt) => `${pt.utmX}, ${pt.utmY}`).join("\n");

    const pointPlacemarks = latlngs
      .map((pt) => {
        return `    <Placemark>
      <name>${pt.utmX}, ${pt.utmY}</name>
      <styleUrl>#labelStyle</styleUrl>
      <Point>
        <coordinates>${pt.lng},${pt.lat},0</coordinates>
      </Point>
    </Placemark>`;
      })
      .join("\n");

    const polyCoords = [...latlngs, latlngs[0]]
      .map((p) => `${p.lng},${p.lat},0`)
      .join(" ");

    const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <Style id="gold">
      <LineStyle>
        <color>FFFFFFFF</color>
        <width>6</width>
      </LineStyle>
      <PolyStyle>
        <color>9000D7FF</color>
      </PolyStyle>
    </Style>

    <Style id="labelStyle">
      <IconStyle>
        <color>00ffffff</color>
        <scale>0</scale>
      </IconStyle>
      <LabelStyle>
        <color>ffffffff</color>
        <scale>1.0</scale>
      </LabelStyle>
    </Style>

    <Placemark>
      <name>Polygon Area</name>
      <description>${utmList}</description>
      <styleUrl>#gold</styleUrl>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>${polyCoords}</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>

${pointPlacemarks}
  </Document>
</kml>`;

    const zip = new JSZip();
    zip.file("doc.kml", kml);

    const blob = await zip.generateAsync({ type: "blob" });
    safeDownloadBlob(blob, `Polygon_${ts}.kmz`);
  };

  const exportDXF = () => {
    if (validRows.length < 2) return;

    const ts = makeJalaliTimestampSlug();

    const points = validRows.map((r) => ({
      x: parseFloat(r.x),
      y: parseFloat(r.y),
    }));

    const isClosed = points.length >= 3;

    const polylineVertices = [...points, ...(isClosed ? [points[0]] : [])]
      .map(
        (pt) => `0
VERTEX
8
POLYGON
10
${pt.x}
20
${pt.y}
30
0`
      )
      .join("\n");

    const pointEntities = points
      .map((pt) => {
        return `0
POINT
8
POINTS
10
${pt.x}
20
${pt.y}
30
0
0
TEXT
8
LABELS
10
${pt.x}
20
${pt.y}
30
0
40
2.5
1
${pt.x}, ${pt.y}
50
0`;
      })
      .join("\n");

    const dxf = `0
SECTION
2
HEADER
0
ENDSEC
0
SECTION
2
TABLES
0
ENDSEC
0
SECTION
2
ENTITIES
0
POLYLINE
8
POLYGON
66
1
70
${isClosed ? 1 : 0}
${polylineVertices}
0
SEQEND
${pointEntities}
0
ENDSEC
0
EOF`;

    const blob = new Blob([dxf], { type: "application/dxf;charset=utf-8;" });
    safeDownloadBlob(blob, `Polygon_${ts}.dxf`);
  };

  const exportPDF = async () => {
    if (!mapWrapperRef.current) return;
    if (latlngs.length === 0) return;

    try {
      setIsExportingPdf(true);
      setSelectedPointIndex(null);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const targetEl =
        (mapWrapperRef.current.querySelector(
          ".leaflet-container"
        ) as HTMLElement | null) ?? mapWrapperRef.current;

      const canvas = await html2canvas(targetEl, {
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("landscape", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const titleY = 10;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text("Map Screenshot with Points", margin, titleY + 4);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`UTM Zone: ${zone}`, margin, titleY + 11);
      pdf.text(
        `Capacity (MW): ${((area / 10000) / 1.5).toFixed(2)}`,
        margin + 45,
        titleY + 11
      );

      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - 28;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const imgRatio = imgWidth / imgHeight;
      const boxRatio = availableWidth / availableHeight;

      let renderWidth = availableWidth;
      let renderHeight = availableHeight;

      if (imgRatio > boxRatio) {
        renderHeight = availableWidth / imgRatio;
      } else {
        renderWidth = availableHeight * imgRatio;
      }

      const x = (pageWidth - renderWidth) / 2;
      const y = 22;

      pdf.addImage(imgData, "JPEG", x, y, renderWidth, renderHeight);
      pdf.save(`Map_${makeJalaliTimestampSlug()}.pdf`);
    } catch (error) {
      console.error(error);
      alert("خطا در تهیه فایل PDF.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-slate-50 flex items-center justify-center font-sans text-lg">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @font-face {
           font-family: 'B Nazanin';
           src: local('B Nazanin');
        }
        
        .sidebar-font {
          font-family: 'B Nazanin', Tahoma, sans-serif;
        }

        .custom-utm-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }

        .custom-utm-tooltip::before {
          display: none !important;
        }

        .leaflet-tooltip-right.custom-utm-tooltip::before,
        .leaflet-tooltip-left.custom-utm-tooltip::before,
        .leaflet-tooltip-top.custom-utm-tooltip::before,
        .leaflet-tooltip-bottom.custom-utm-tooltip::before {
          display: none !important;
          border: none !important;
        }

        .leaflet-container {
          font-family: inherit;
        }
      `}</style>

      <div
        className="flex flex-row w-full h-screen bg-slate-100 text-[17px] sidebar-font"
        dir="rtl"
      >
        <div className="w-[450px] bg-white h-full shadow-xl z-[1001] flex flex-col border-l">
          <div className="p-8 bg-slate-900 text-white">
            <h1 className="text-3xl font-bold text-yellow-500">
              سامانه ترسیم و تحلیل مختصات
            </h1>
            <p className="text-sm opacity-90 mt-3">
              خروجی‌های مهندسی با دقت بالا (UTM/GIS)
            </p>
          </div>

          <div className="p-8 flex-1 overflow-y-auto space-y-8">
            <div>
              <label className="text-lg font-bold block mb-3 text-slate-700">
                زون منطقه (UTM Zone):
              </label>
              <input
                type="number"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full border rounded-xl p-4 text-lg focus:ring-2 focus:ring-yellow-500 outline-none bg-slate-50"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setRows([...rows, { x: "", y: "" }])}
                  className="text-sm font-bold text-blue-700 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50"
                >
                  افزودن سطر
                </button>
              </div>

              <div className="flex gap-3 mb-2 text-slate-700 font-bold text-base">
                <div className="w-1/2 text-center">طول جغرافیایی</div>
                <div className="w-1/2 text-center">عرض جغرافیایی</div>
              </div>

              <div className="space-y-3">
                {rows.map((row, i) => (
                  <div key={i} className="flex gap-3">
                    <input
                      placeholder="X (East)"
                      value={row.x}
                      onChange={(e) => updateRow(i, "x", e.target.value)}
                      className="w-1/2 border rounded-xl p-4 text-lg font-mono bg-slate-50"
                    />

                    <input
                      placeholder="Y (North)"
                      value={row.y}
                      onChange={(e) => updateRow(i, "y", e.target.value)}
                      className="w-1/2 border rounded-xl p-4 text-lg font-mono bg-slate-50"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-slate-500 block mb-1">
                    مساحت زمین (هکتار)
                  </span>
                  <span className="font-bold text-xl text-slate-900">
                    {(area / 10000).toFixed(2)}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-slate-500 block mb-1">
                    ظرفیت نیروگاه (مگاوات)
                  </span>
                  <span className="font-bold text-xl text-slate-900">
                    {((area / 10000) / 1.5).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-100">
              <button
                onClick={exportExcel}
                className="border border-slate-300 py-4 rounded-xl text-base font-bold hover:bg-slate-50 transition-colors"
              >
                مختصات اکسل
              </button>

              <button
                onClick={exportKMZ}
                disabled={latlngs.length < 3}
                className="bg-slate-800 text-white py-4 rounded-xl text-base font-bold disabled:opacity-30 transition-all"
              >
                فایل نقشه جغرافیایی KMZ
              </button>

              <button
                onClick={exportDXF}
                disabled={validRows.length < 2}
                className="bg-blue-700 text-white py-4 rounded-xl text-base font-bold disabled:opacity-30 transition-all"
              >
                نقشه زمین اتوکد
              </button>

              <button
                onClick={exportPDF}
                disabled={latlngs.length < 1 || isExportingPdf}
                className="bg-red-600 text-white py-4 rounded-xl text-base font-bold disabled:opacity-30 transition-all"
              >
                {isExportingPdf
                  ? "در حال پردازش..."
                  : "عکس نقشه جغرافیایی سایت"}
              </button>
            </div>

            <div className="text-sm leading-7 text-slate-600 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              این سایت برای آماده سازی اسناد مربوط به نیروگاه خورشیدی از جمله
              فایل KMZ مختصات و نقشه هوایی آماده شده است
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setRows((prev) =>
                    prev.length > 0
                      ? prev.map(() => ({ x: "", y: "" }))
                      : [
                          { x: "", y: "" },
                          { x: "", y: "" },
                          { x: "", y: "" },
                          { x: "", y: "" },
                          { x: "", y: "" },
                        ]
                  )
                }
                className="border border-red-300 text-red-700 py-4 rounded-xl text-base font-bold hover:bg-red-50 transition-colors"
              >
                پاک کردن تمام نقاط
              </button>

              <button
                onClick={() =>
                  setRows([
                    { x: "530357", y: "3950691" },
                    { x: "530368", y: "3950745" },
                    { x: "530408", y: "3950768" },
                    { x: "530462", y: "3950742" },
                    { x: "530436", y: "3950692" },
                    { x: "530465", y: "3950642" },
                    { x: "530414", y: "3950616" },
                    { x: "530372", y: "3950638" },
                          ])
                }
                className="border border-green-300 text-green-700 py-4 rounded-xl text-base font-bold hover:bg-green-50 transition-colors"
              >
                نمایش نقاط پیش فرض
              </button>
            </div>
          </div>
        </div>

        <div ref={mapWrapperRef} className="flex-1 relative bg-slate-200">
          <MapContainer
            center={mapCenter}
            zoom={latlngs.length > 0 ? 18 : 15}
            preferCanvas={true}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              attribution='Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            <FitBounds latlngs={latlngs} />

            {latlngs.length >= 3 && (
              <Polygon
                positions={latlngs.map((p) => [p.lat, p.lng])}
                pathOptions={
                  {
                    color: "#FFFFFF",
                    opacity: 0.95,
                    weight: 4,
                    fillColor: "#FFD700",
                    fillOpacity: 0.3,
                    renderer: mapRenderer,
                  } as L.PathOptions
                }
              />
            )}

            {latlngs.map((p, idx) => (
              <Marker
                key={`pt-${idx}`}
                position={[p.lat, p.lng]}
                icon={customDivIcon}
                eventHandlers={{
                  click: () => setSelectedPointIndex(idx),
                }}
              >
                <Tooltip
                  direction="right"
                  permanent
                  offset={[8, -8]}
                  opacity={1}
                  interactive={false}
                  className="custom-utm-tooltip"
                >
                  <div
                    style={{
                      color: "#ffffff",
                      fontFamily: "monospace",
                      fontSize: "18px",
                      fontWeight: "bold",
                      lineHeight: 1.3,
                      textShadow:
                        "1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000",
                      whiteSpace: "nowrap",
                      background: "transparent",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {p.utmX}
                    <br />
                    {p.utmY}
                  </div>
                </Tooltip>

                {selectedPointIndex === idx && (
                  <Popup
                    position={[p.lat, p.lng]}
                    eventHandlers={{
                      remove: () => setSelectedPointIndex(null),
                    }}
                  >
                    <div
                      className="text-right sidebar-font"
                      style={{
                        minWidth: 200,
                        direction: "rtl",
                        fontSize: "16px",
                      }}
                    >
                      <div className="font-bold border-b pb-2 mb-2 text-blue-700">
                        نقطه {idx + 1}
                      </div>

                      <div className="text-base space-y-1">
                        <div>
                          <b>X:</b> {p.utmX}
                        </div>

                        <div>
                          <b>Y:</b> {p.utmY}
                        </div>

                        <div className="text-sm text-slate-400 mt-2 pt-1 border-t">
                          Lat: {p.lat.toFixed(6)}
                          <br />
                          Lng: {p.lng.toFixed(6)}
                        </div>
                      </div>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}
