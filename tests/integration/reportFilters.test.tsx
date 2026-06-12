import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ReportFilters } from "../../src/features/reports/components/ReportFilters";
import { defaultMapFilter } from "../../src/map/mapFilters";

describe("ReportFilters", () => {
  it("updates condition/status filters and can reset", async () => {
    const onChange = vi.fn();
    render(<ReportFilters filter={defaultMapFilter} onChange={onChange} />);
    expect(screen.getByRole("heading", { name: /scent trails/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/injured/i)).not.toBeChecked();
    expect(screen.getByText(/food bowl support cue/i)).toBeInTheDocument();
    expect(screen.getAllByText(/collar tag stage/i).length).toBeGreaterThan(0);
    await userEvent.click(screen.getByLabelText(/injured/i));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ conditions: ["injured"] }));
    await userEvent.click(screen.getByLabelText(/resolved/i));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ statuses: expect.arrayContaining(["resolved"]) }));
    await userEvent.click(screen.getByRole("button", { name: /reset filters/i }));
    expect(onChange).toHaveBeenCalledWith({ conditions: [], statuses: ["reported", "monitoring", "helped"] });
  });
});
