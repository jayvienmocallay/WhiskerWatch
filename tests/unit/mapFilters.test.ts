import { describe, expect, it } from "vitest";
import { approximateLocation } from "../../src/map/locationPrivacy";
import { defaultMapFilter, filterReports, toggleValue } from "../../src/map/mapFilters";
import { conditionVocabulary } from "../../src/ui/statusVocabulary";
import { designColors } from "../../src/ui/designTokens";
import { makeReport } from "../../src/test/fixtures/reports";

describe("map filters", () => {
  it("uses active statuses by default and hides closed reports", () => {
    const reports = [
      makeReport({ id: "report-1", status: "reported" }),
      makeReport({ id: "report-2", status: "closed" }),
    ];
    expect(filterReports(reports, defaultMapFilter)).toHaveLength(1);
  });

  it("filters by condition and status", () => {
    const reports = [
      makeReport({ id: "report-1", condition: "injured", status: "reported" }),
      makeReport({ id: "report-2", condition: "healthy", status: "reported" }),
    ];
    expect(filterReports(reports, { conditions: ["injured"], statuses: ["reported"] })).toHaveLength(1);
  });

  it("toggles filter values and approximates location", () => {
    expect(toggleValue(["reported"], "reported")).toEqual([]);
    expect(toggleValue([], "injured")).toEqual(["injured"]);
    expect(approximateLocation({ latitude: 14.59955, longitude: 120.98424 })).toEqual({
      latitude: 14.6,
      longitude: 120.984,
    });
  });

  it("exposes catsy design metadata for non-color cues", () => {
    expect(designColors.mossCollar).toBe("#256F55");
    expect(conditionVocabulary.injured.symbol).toBe("▲");
    expect(conditionVocabulary.needs_food.cue).toMatch(/food bowl/i);
  });
});
