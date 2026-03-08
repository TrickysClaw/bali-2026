"use client";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { DayData, IdeaCategory } from "../data/tripData";
import { typeConfig } from "../data/tripData";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const typeColors: Record<string, string> = {
  adventure: "#ef4444",
  food: "#f59e0b",
  nightlife: "#a855f7",
  chill: "#06b6d4",
  culture: "#10b981",
  transport: "#64748b",
};

function createIcon(type: string, label: string) {
  const color = typeColors[type] || "#06b6d4";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${color};
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      border: 2px solid rgba(255,255,255,0.9);
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    ">${label}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

function createIdeaIcon(type: string) {
  const color = typeColors[type] || "#06b6d4";
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${color};
      color: white;
      width: 22px;
      height: 22px;
      transform: rotate(45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: 700;
      border: 2px solid rgba(255,255,255,0.7);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      opacity: 0.8;
      border-radius: 3px;
    "><span style="transform: rotate(-45deg);">💡</span></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -14],
  });
}

function FitBounds({ markers }: { markers: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(([lat, lng]) => [lat, lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [markers, map]);
  return null;
}

export type MapFilter = "itinerary" | "ideas" | "both";

type Props = {
  days: DayData[];
  activeDay: number;
  showAllDays: boolean;
  ideas?: IdeaCategory[];
  mapFilter?: MapFilter;
};

export default function TripMap({ days, activeDay, showAllDays, ideas, mapFilter = "itinerary" }: Props) {
  const showItinerary = mapFilter === "itinerary" || mapFilter === "both";
  const showIdeas = mapFilter === "ideas" || mapFilter === "both";

  const activitiesWithCoords = showItinerary
    ? (showAllDays
        ? days.flatMap((d, di) =>
            d.activities
              .filter((a) => a.lat && a.lng)
              .map((a, ai) => ({ ...a, dayIdx: di, order: ai + 1 }))
          )
        : days[activeDay].activities
            .filter((a) => a.lat && a.lng)
            .map((a, ai) => ({ ...a, dayIdx: activeDay, order: ai + 1 })))
    : [];

  const ideaItems = showIdeas && ideas
    ? ideas.flatMap((cat) =>
        cat.items.filter((item) => item.lat && item.lng).map((item) => ({ ...item, category: cat.category }))
      )
    : [];

  const allMarkers: [number, number][] = [
    ...activitiesWithCoords.map((a) => [a.lat!, a.lng!] as [number, number]),
    ...ideaItems.map((i) => [i.lat!, i.lng!] as [number, number]),
  ];

  const center: [number, number] = allMarkers.length > 0
    ? [
        allMarkers.reduce((s, m) => s + m[0], 0) / allMarkers.length,
        allMarkers.reduce((s, m) => s + m[1], 0) / allMarkers.length,
      ]
    : [-8.7862, 115.1558];

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/[0.06]">
      <MapContainer
        center={center}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds markers={allMarkers} />
        {activitiesWithCoords.map((act) => {
          const tc = typeConfig[act.type];
          const dayLabel = showAllDays ? `D${act.dayIdx + 1}` : `${act.order}`;
          return (
            <Marker
              key={`${act.id}-${act.dayIdx}`}
              position={[act.lat!, act.lng!]}
              icon={createIcon(act.type, dayLabel)}
            >
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{act.title}</p>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>
                    {showAllDays ? `Day ${act.dayIdx + 1} · ` : ""}{act.time} · {tc.label}
                  </p>
                  <p style={{ fontSize: 12, color: "#cbd5e1" }}>{act.desc}</p>
                  {act.cost !== undefined && act.cost > 0 && (
                    <p style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>~${act.cost} AUD/person</p>
                  )}
                  {act.link && (
                    <a href={act.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#22d3ee", marginTop: 4, display: "inline-block" }}>
                      View on Maps →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
        {ideaItems.map((item) => {
          const tc = typeConfig[item.type];
          return (
            <Marker
              key={`idea-${item.id}`}
              position={[item.lat!, item.lng!]}
              icon={createIdeaIcon(item.type)}
            >
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, background: "#fbbf24", color: "#000", padding: "1px 6px", borderRadius: 8, fontWeight: 700 }}>IDEA</span>
                    <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{item.name}</p>
                  </div>
                  <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>
                    {item.area} · {tc.label}
                  </p>
                  <p style={{ fontSize: 12, color: "#cbd5e1" }}>{item.note}</p>
                  {item.cost !== undefined && item.cost > 0 && (
                    <p style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>~${item.cost} AUD/person</p>
                  )}
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#22d3ee", marginTop: 4, display: "inline-block" }}>
                      View on Maps →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
