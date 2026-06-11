import { beforeEach, describe, expect, it } from "vitest";
import { clearMemoryReports, listActiveReports, seedMemoryReports } from "../../src/firebase/reportsRepository";
import { makeReport } from "../../src/test/fixtures/reports";

describe("report read contract", () => {
  beforeEach(() => clearMemoryReports());

  it("reads active reports and excludes closed reports", async () => {
    seedMemoryReports([
      makeReport({ id: "report-1", status: "reported" }),
      makeReport({ id: "report-2", status: "closed" }),
    ]);
    const reports = await listActiveReports();
    expect(reports).toHaveLength(1);
    expect(reports[0].status).toBe("reported");
  });
});
