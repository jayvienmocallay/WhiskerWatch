import { useEffect } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import type { CatReport, ReportLocation } from "../features/reports/reportTypes";
import { markerAccessibleName, markerClass, markerHtml, markerSymbol } from "./markers";
import { conditionVocabulary, statusVocabulary } from "../ui/statusVocabulary";
import { useUserLocation, type UserLocation } from "./useUserLocation";

interface CatMapProps {
  reports: CatReport[];
  selectedLocation?: ReportLocation;
  selectedReportId?: string;
  onSelectLocation: (location: ReportLocation) => void;
  onSelectReport: (reportId: string) => void;
}

function LocationPicker({ onSelectLocation }: { onSelectLocation: (location: ReportLocation) => void }) {
  useMapEvents({
    click(event) {
      onSelectLocation({ latitude: event.latlng.lat, longitude: event.latlng.lng });
    },
  });
  return null;
}

function MapViewport({
  selectedLocation,
  userLocation,
}: {
  selectedLocation?: ReportLocation;
  userLocation: UserLocation;
}) {
  const map = useMap();

  useEffect(() => {
    const location = selectedLocation ?? userLocation;
    map.setView([location.latitude, location.longitude], map.getZoom());
  }, [map, selectedLocation, userLocation]);

  return null;
}

function iconFor(report: CatReport, selected: boolean) {
  return L.divIcon({
    className: `${markerClass(report.condition)} ${selected ? "marker-selected" : ""}`,
    html: markerHtml(report.condition),
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
}

const selectedLocationIcon = L.divIcon({
  className: "selected-location-marker",
  html: `<span aria-hidden="true">PIN</span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const currentLocationIcon = L.divIcon({
  className: "current-location-marker",
  html: `<span aria-hidden="true"></span>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export function CatMap({
  reports,
  selectedLocation,
  selectedReportId,
  onSelectLocation,
  onSelectReport,
}: CatMapProps) {
  const { location: userLocation, message, requestLocation, status } = useUserLocation();
  const canShowMap = status === "granted" && userLocation;
  const center: [number, number] | undefined = canShowMap
    ? selectedLocation
      ? [selectedLocation.latitude, selectedLocation.longitude]
      : [userLocation.latitude, userLocation.longitude]
    : undefined;

  return (
    <section className="map-panel" aria-label="Cat report map">
      <div className="map-panel-heading">
        <div>
          <p className="eyebrow">Live view</p>
          <h2>The Territory</h2>
        </div>
        <span>{reports.length} visible</span>
      </div>
      {canShowMap && center ? (
        <MapContainer center={center} zoom={15} scrollWheelZoom className="leaflet-map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapViewport selectedLocation={selectedLocation} userLocation={userLocation} />
          <LocationPicker onSelectLocation={onSelectLocation} />
          <Circle
            center={[userLocation.latitude, userLocation.longitude]}
            radius={Math.max(userLocation.accuracy, 10)}
            pathOptions={{
              color: "#256f55",
              fillColor: "#5dbb78",
              fillOpacity: 0.12,
              weight: 1,
            }}
          />
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={currentLocationIcon}
            title="Your current location"
            alt="Your current location"
          />
          {selectedLocation ? (
            <Marker
              position={[selectedLocation.latitude, selectedLocation.longitude]}
              icon={selectedLocationIcon}
              title="Selected approximate paw drop"
            />
          ) : null}
          {reports.map((report) => (
            <Marker
              key={report.id}
              position={[report.location.latitude, report.location.longitude]}
              icon={iconFor(report, selectedReportId === report.id)}
              eventHandlers={{ click: () => onSelectReport(report.id) }}
              title={markerAccessibleName(report)}
              alt={markerAccessibleName(report)}
            >
              <Popup>
                <button type="button" className="cat-tag-popup" onClick={() => onSelectReport(report.id)}>
                  <span aria-hidden="true">{markerSymbol(report.condition)}</span>
                  {conditionVocabulary[report.condition].label} - {statusVocabulary[report.status].label}
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div
          className={`location-gate location-gate-${status}`}
          role={status === "denied" || status === "error" || status === "unavailable" ? "alert" : "status"}
          aria-live="polite"
        >
          <span className="location-gate-icon" aria-hidden="true">◎</span>
          <div>
            <h3>Location access required</h3>
            <p>{message}</p>
            <p className="location-privacy-note">
              Your current coordinates stay in this browser and are not saved with a report.
            </p>
          </div>
          {status !== "requesting" ? (
            <button type="button" onClick={requestLocation}>
              Try location again
            </button>
          ) : null}
        </div>
      )}
      <div className="report-list" aria-label="Visible reports">
        {reports.map((report) => (
          <button
            type="button"
            key={report.id}
            className={selectedReportId === report.id ? "report-list-item selected" : "report-list-item"}
            onClick={() => onSelectReport(report.id)}
            aria-label={markerAccessibleName(report)}
          >
            <span className={markerClass(report.condition)} aria-hidden="true">{markerSymbol(report.condition)}</span>
            <span>{conditionVocabulary[report.condition].label}</span>
            <span className="tag-status" aria-hidden="true">{statusVocabulary[report.status].symbol}</span>
            <span className="sr-only">{statusVocabulary[report.status].cue}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
