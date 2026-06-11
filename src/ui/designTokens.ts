import type { Condition, ReportStatus } from "../features/reports/reportTypes";

export const designColors = {
  coalTabby: "#1F2A24",
  mossCollar: "#256F55",
  porchLeaf: "#DDEADF",
  milkSaucer: "#F8FAF7",
  tunaGold: "#F2C14E",
  gingerAlert: "#E95F45",
  tabbyGreen: "#5DBB78",
  nightWhisker: "#52655C",
  warmCardboard: "#C98B55",
  softSalmon: "#F9D4CD",
} as const;

export const conditionVisuals: Record<
  Condition,
  { icon: "tail" | "alert-ear" | "food-bowl"; cue: string; toneClass: string; trailClass: string }
> = {
  healthy: {
    icon: "tail",
    cue: "Calm tail signal",
    toneClass: "tone-healthy",
    trailClass: "trail-healthy",
  },
  injured: {
    icon: "alert-ear",
    cue: "Alert ear signal",
    toneClass: "tone-injured",
    trailClass: "trail-injured",
  },
  needs_food: {
    icon: "food-bowl",
    cue: "Food bowl signal",
    toneClass: "tone-needs-food",
    trailClass: "trail-needs-food",
  },
};

export const statusVisuals: Record<
  ReportStatus,
  { icon: "collar-tag" | "watch-eye" | "helped-paw" | "check-tag" | "moon-tail"; cue: string }
> = {
  reported: { icon: "collar-tag", cue: "Collar tag stage" },
  monitoring: { icon: "watch-eye", cue: "Watchful whiskers stage" },
  helped: { icon: "helped-paw", cue: "Helped paw stage" },
  resolved: { icon: "check-tag", cue: "Checked collar tag stage" },
  closed: { icon: "moon-tail", cue: "Quiet closed stage" },
};
