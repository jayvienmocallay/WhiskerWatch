import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReportSuccess } from "../../src/features/reports/components/ReportSuccess";
import { makeReport } from "../../src/test/fixtures/reports";

describe("ReportSuccess", () => {
  it("shows a submitted report summary and recovery actions", async () => {
    const onCreateAnother = vi.fn();
    const onContinueMonitoring = vi.fn();
    render(
      <ReportSuccess
        report={makeReport({ condition: "injured", status: "reported", notes: "Near the library." })}
        onCreateAnother={onCreateAnother}
        onContinueMonitoring={onContinueMonitoring}
      />,
    );

    expect(screen.getByRole("heading", { name: "Help Signal Sent" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /WhiskerWatch neighborhood lookout/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Submitted report summary")).toHaveTextContent("Injured");
    await userEvent.click(screen.getByRole("button", { name: /Create another report/i }));
    await userEvent.click(screen.getByRole("button", { name: /Continue monitoring/i }));
    expect(onCreateAnother).toHaveBeenCalledOnce();
    expect(onContinueMonitoring).toHaveBeenCalledOnce();
  });

  it("shows a fallback when opened without a fresh report", () => {
    render(<ReportSuccess onCreateAnother={vi.fn()} onContinueMonitoring={vi.fn()} />);
    expect(screen.getByText(/No fresh report is selected/i)).toBeInTheDocument();
  });
});
