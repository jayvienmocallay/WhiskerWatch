import { render, renderHook, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CatMap } from "../../src/map/CatMap";
import { useUserLocation } from "../../src/map/useUserLocation";

function positionAt(latitude: number, longitude: number): GeolocationPosition {
  return {
    coords: {
      accuracy: 18,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude,
      longitude,
      speed: null,
      toJSON: () => ({}),
    },
    timestamp: Date.now(),
    toJSON: () => ({}),
  };
}

describe("user location access", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("tracks the current location after permission is allowed", async () => {
    const clearWatch = vi.fn();
    const watchPosition = vi.fn((success: PositionCallback) => {
      success(positionAt(14.5995, 120.9842));
      return 7;
    });

    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { clearWatch, watchPosition },
    });

    const { result, unmount } = renderHook(() => useUserLocation());

    await waitFor(() => expect(result.current.status).toBe("granted"));
    expect(result.current.location).toMatchObject({
      accuracy: 18,
      latitude: 14.5995,
      longitude: 120.9842,
    });

    unmount();
    expect(clearWatch).toHaveBeenCalledWith(7);
  });

  it("blocks map access when location permission is denied", async () => {
    const watchPosition = vi.fn(
      (_success: PositionCallback, error: PositionErrorCallback) => {
        error({
          code: 1,
          message: "Permission denied",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        });
        return 3;
      },
    );

    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { clearWatch: vi.fn(), watchPosition },
    });

    const { result } = renderHook(() => useUserLocation());

    await waitFor(() => expect(result.current.status).toBe("denied"));
    expect(result.current.location).toBeUndefined();
    expect(result.current.message).toMatch(/browser settings/i);

    const { container } = render(
      <CatMap
        reports={[]}
        onSelectLocation={vi.fn()}
        onSelectReport={vi.fn()}
      />,
    );

    expect(await screen.findByRole("heading", { name: "Location access required" })).toBeInTheDocument();
    expect(container.querySelector(".leaflet-map")).not.toBeInTheDocument();
  });
});
