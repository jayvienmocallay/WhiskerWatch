import type { ReportLocation } from "../features/reports/reportTypes";

const precision = 3;

export function approximateLocation(location: ReportLocation): ReportLocation {
  return {
    latitude: Number(location.latitude.toFixed(precision)),
    longitude: Number(location.longitude.toFixed(precision)),
  };
}

export function formatApproximateLocation(location: ReportLocation): string {
  const approx = approximateLocation(location);
  return `${approx.latitude.toFixed(precision)}, ${approx.longitude.toFixed(precision)} approx.`;
}
