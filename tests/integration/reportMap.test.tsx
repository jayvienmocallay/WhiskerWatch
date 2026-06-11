import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReportDetail } from "../../src/features/reports/components/ReportDetail";
import { markerAccessibleName, markerClass } from "../../src/map/markers";
import { markerHtml } from "../../src/map/markers";
import { makeReport } from "../../src/test/fixtures/reports";

describe("report map and detail behavior", () => {
  it("creates accessible marker labels and condition classes", () => {
    const report = makeReport({ condition: "injured", status: "reported" });
    expect(markerAccessibleName(report)).toMatch(/injured cat report, reported/i);
    expect(markerClass("needs_food")).toBe("marker cat-marker marker-needs-food");
    expect(markerHtml("injured")).toContain("▲");
  });

  it("shows report detail with approximate location and safe notes", () => {
    const report = makeReport({
      condition: "injured",
      location: { latitude: 14.59955, longitude: 120.98424 },
      notes: "Near the public market.",
    });
    render(<ReportDetail report={report} />);
    expect(screen.getByText("Injured")).toBeInTheDocument();
    expect(screen.getByText(/14\.600, 120\.984 approx/i)).toBeInTheDocument();
    expect(screen.getByText(/public market/i)).toBeInTheDocument();
  });
});
