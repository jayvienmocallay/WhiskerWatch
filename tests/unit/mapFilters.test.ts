import { describe, expect, it } from "vitest";
import { filterReports, toggleValue } from "../../src/map/mapFilters";
import { makeReport } from "../../src/test/fixtures/reports";
import { conditionVocabulary } from "../../src/ui/statusVocabulary";
import { designColors } from "../../src/ui/designTokens";

describe("map filters", () => {
  it("toggles values without duplicates", () => {
    expect(toggleValue(["a"], "a")).toEqual([]);
    expect(toggleValue(["a"], "b")).toEqual(["a", "b"]);
  });

  it("filters reports by condition and status", () => {
    const reports = [
      makeReport({ id: "report-1", condition: "injured", status: "reported" }),
      makeReport({ id: "report-2", condition: "healthy", status: "helped" }),
    ];
    expect(filterReports(reports, { conditions: ["injured"], statuses: [] })).toHaveLength(1);
    expect(filterReports(reports, { conditions: [], statuses: ["helped"] })).toHaveLength(1);
  });

  it("returns all reports when no filters are active", () => {
    const reports = [makeReport({ id: "report-1" }), makeReport({ id: "report-2" })];
    expect(filterReports(reports, { conditions: [], statuses: [] })).toEqual(reports);
  });

  it("exposes catsy design metadata for non-color cues", () => {
    expect(designColors.mossCollar).toBe("#256F55");
    expect(conditionVocabulary.injured.symbol).toBe("ALERT");
    expect(conditionVocabulary.needs_food.cue).toMatch(/food bowl/i);
  });
});
