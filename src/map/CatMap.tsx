import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { CatReport, ReportLocation } from "../features/reports/reportTypes";
import { markerAccessibleName, markerClass, markerHtml, markerSymbol } from "./markers";
import { conditionVocabulary, statusVocabulary } from "../ui/statusVocabulary";

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

function iconFor(report: CatReport, selected: boolean) {
  return L.divIcon({
    className: `${markerClass(report.condition)} ${selected ? "marker-selected" : ""}`,
    html: markerHtml(report.condition),
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

const selectedLocationIcon = L.divIcon({
  className: "selected-location-marker",
  html: `<span aria-hidden="true">◖</span>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export function CatMap({
  reports,
  selectedLocation,
  selectedReportId,
  onSelectLocation,
  onSelectReport,
}: CatMapProps) {
  const center: [number, number] = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : [14.5995, 120.9842];

  return (
    <section className="map-panel" aria-label="Cat report map">
      <MapContainer center={center} zoom={13} scrollWheelZoom className="leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationPicker onSelectLocation={onSelectLocation} />
        {selectedLocation ? (
          <Marker position={[selectedLocation.latitude, selectedLocation.longitude]} icon={selectedLocationIcon} title="Selected approximate paw drop" />
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
                {conditionVocabulary[report.condition].label} · {statusVocabulary[report.status].label}
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
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
          </button>
        ))}
      </div>
    </section>
  );
}
