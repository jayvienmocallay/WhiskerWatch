import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../../src/app/App";
import { clearMemoryReports, seedMemoryReports } from "../../src/firebase/reportsRepository";
import { makeReports } from "../../src/test/fixtures/reports";

describe("app page navigation", () => {
  beforeEach(() => {
    clearMemoryReports();
    window.history.replaceState(null, "", "/");
  });

  it("navigates between workbench and patrol logs without losing report context", async () => {
    seedMemoryReports(makeReports(3));
    render(<App />);

    expect(screen.getByRole("img", { name: /WhiskerWatch neighborhood lookout/i })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "The Territory" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Patrol Logs" }));
    expect(await screen.findByRole("heading", { name: "Patrol Logs" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
    await userEvent.click(screen.getByRole("button", { name: "The Territory" }));
    expect(screen.getByRole("heading", { name: "The Territory" })).toBeInTheDocument();
  });
});
