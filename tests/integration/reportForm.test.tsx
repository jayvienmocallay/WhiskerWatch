import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReportForm } from "../../src/features/reports/components/ReportForm";
import { makePhotoFile } from "../../src/test/fixtures/reports";

describe("ReportForm", () => {
  it("shows required field errors", async () => {
    const onSubmitReport = vi.fn();
    render(<ReportForm onSubmitReport={onSubmitReport} />);
    expect(screen.getByRole("heading", { name: /rescue note/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /submit report/i }));
    expect(screen.getByText(/choose a map location/i)).toBeInTheDocument();
    expect(screen.getByText(/choose the cat condition/i)).toBeInTheDocument();
    expect(onSubmitReport).not.toHaveBeenCalled();
  });

  it("submits a valid report and shows success", async () => {
    const onSubmitReport = vi.fn().mockResolvedValue(undefined);
    render(
      <ReportForm
        selectedLocation={{ latitude: 14.5995, longitude: 120.9842 }}
        onSubmitReport={onSubmitReport}
      />,
    );
    await userEvent.click(screen.getByLabelText(/injured/i));
    expect(screen.getByText(/alert ear signal/i)).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText(/notes/i), "Orange cat near the market.");
    await userEvent.click(screen.getByRole("button", { name: /submit report/i }));
    expect(await screen.findByText(/report submitted/i)).toBeInTheDocument();
    expect(onSubmitReport).toHaveBeenCalledOnce();
  });

  it("rejects invalid photo and unsafe notes", async () => {
    const user = userEvent.setup();
    render(
      <ReportForm
        selectedLocation={{ latitude: 14.5995, longitude: 120.9842 }}
        onSubmitReport={vi.fn()}
      />,
    );
    await user.click(screen.getByLabelText(/healthy/i));
    await user.upload(screen.getByLabelText(/photo/i), makePhotoFile({ type: "text/plain" }));
    await user.type(screen.getByLabelText(/notes/i), "Call 555-123-1234");
    await user.click(screen.getByRole("button", { name: /submit report/i }));
    expect(screen.getByText(/JPEG, PNG, or WebP/i)).toBeInTheDocument();
    expect(screen.getAllByText(/remove contact details/i).length).toBeGreaterThan(0);
  });
});
