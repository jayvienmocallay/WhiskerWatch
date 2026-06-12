import type { Condition, ReportStatus } from "../features/reports/reportTypes";
import { conditionVisuals, statusVisuals } from "./designTokens";

export const conditionVocabulary: Record<
  Condition,
  {
    label: string;
    markerLabel: string;
    tone: string;
    symbol: string;
    cue: string;
    toneClass: string;
    trailClass: string;
  }
> = {
  healthy: {
    label: "Healthy",
    markerLabel: "Healthy cat report",
    tone: "stable",
    symbol: conditionVisuals.healthy.symbol,
    cue: conditionVisuals.healthy.cue,
    toneClass: conditionVisuals.healthy.toneClass,
    trailClass: conditionVisuals.healthy.trailClass,
  },
  injured: {
    label: "Injured",
    markerLabel: "Urgent injured cat report",
    tone: "urgent",
    symbol: conditionVisuals.injured.symbol,
    cue: conditionVisuals.injured.cue,
    toneClass: conditionVisuals.injured.toneClass,
    trailClass: conditionVisuals.injured.trailClass,
  },
  needs_food: {
    label: "Needs food",
    markerLabel: "Cat needs food report",
    tone: "support",
    symbol: conditionVisuals.needs_food.symbol,
    cue: conditionVisuals.needs_food.cue,
    toneClass: conditionVisuals.needs_food.toneClass,
    trailClass: conditionVisuals.needs_food.trailClass,
  },
};

export const statusVocabulary: Record<ReportStatus, { label: string; isActive: boolean; symbol: string; cue: string }> = {
  reported: { label: "Reported", isActive: true, symbol: statusVisuals.reported.symbol, cue: statusVisuals.reported.cue },
  monitoring: { label: "Monitoring", isActive: true, symbol: statusVisuals.monitoring.symbol, cue: statusVisuals.monitoring.cue },
  helped: { label: "Helped", isActive: true, symbol: statusVisuals.helped.symbol, cue: statusVisuals.helped.cue },
  resolved: { label: "Resolved", isActive: false, symbol: statusVisuals.resolved.symbol, cue: statusVisuals.resolved.cue },
  closed: { label: "Closed", isActive: false, symbol: statusVisuals.closed.symbol, cue: statusVisuals.closed.cue },
};

export const activeStatuses = Object.entries(statusVocabulary)
  .filter(([, value]) => value.isActive)
  .map(([status]) => status as ReportStatus);
