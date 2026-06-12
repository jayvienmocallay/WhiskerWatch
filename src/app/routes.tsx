import App from "./App";

export type AppPageId = "workbench" | "success" | "patrol";

export const appPages: Record<
  AppPageId,
  { id: AppPageId; label: string; title: string; purpose: string; primaryAction: string }
> = {
  workbench: {
    id: "workbench",
    label: "The Territory",
    title: "Workbench Dashboard",
    purpose: "Report and monitor neighborhood cat sightings.",
    primaryAction: "Submit report",
  },
  success: {
    id: "success",
    label: "Help Signal",
    title: "Report Success",
    purpose: "Confirm that a report is visible to helpers.",
    primaryAction: "Create another report",
  },
  patrol: {
    id: "patrol",
    label: "Patrol Logs",
    title: "Patrol Logs",
    purpose: "Scan report activity for volunteer response.",
    primaryAction: "Inspect report activity",
  },
};

export const pageOrder: AppPageId[] = ["workbench", "patrol"];

export const routes = [{ path: "/", element: <App /> }];
