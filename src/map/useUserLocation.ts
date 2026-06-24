import { useCallback, useEffect, useState } from "react";
import type { ReportLocation } from "../features/reports/reportTypes";

export type UserLocation = ReportLocation & {
  accuracy: number;
};

export type UserLocationStatus =
  | "requesting"
  | "granted"
  | "denied"
  | "unavailable"
  | "error";

function messageForError(error: GeolocationPositionError): string {
  if (error.code === 1) {
    return "Location access was denied. Allow location access in your browser settings, then try again.";
  }

  if (error.code === 2) {
    return "Your location could not be determined. Check your device location settings and connection.";
  }

  return "Finding your location took too long. Please try again.";
}

export function useUserLocation() {
  const [status, setStatus] = useState<UserLocationStatus>("requesting");
  const [location, setLocation] = useState<UserLocation>();
  const [message, setMessage] = useState("Allow location access to open the community map.");
  const [requestVersion, setRequestVersion] = useState(0);

  const requestLocation = useCallback(() => {
    setStatus("requesting");
    setMessage("Waiting for your browser's location permission...");
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      setMessage("Location services are not available in this browser or connection.");
      return;
    }

    setStatus("requesting");
    setMessage("Waiting for your browser's location permission...");

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setStatus("granted");
        setMessage("Location access allowed.");
      },
      (error) => {
        setStatus(error.code === 1 ? "denied" : "error");
        setMessage(messageForError(error));
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30_000,
        timeout: 10_000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [requestVersion]);

  return { location, message, requestLocation, status };
}
