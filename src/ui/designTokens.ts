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
  surface: "#F7FAF6",
  surfaceContainerLowest: "#FFFFFF",
  surfaceContainerLow: "#F1F4F0",
  surfaceContainer: "#ECEFEB",
  surfaceContainerHigh: "#E6E9E5",
  outline: "#6F7973",
  outlineVariant: "#BFC9C2",
  error: "#BA1A1A",
  errorContainer: "#FFDAD6",
  primary: "#00563E",
  onPrimary: "#FFFFFF",
  primaryContainer: "#256F55",
  secondary: "#556159",
  secondaryContainer: "#D9E6DB",
  tertiary: "#773834",
  tertiaryContainer: "#944F4A",
} as const;

export const typography = {
  headlineLg: { fontFamily: "Inter", fontSize: "32px", fontWeight: 700, lineHeight: "40px" },
  headlineLgMobile: { fontFamily: "Inter", fontSize: "28px", fontWeight: 700, lineHeight: "36px" },
  headlineMd: { fontFamily: "Inter", fontSize: "24px", fontWeight: 700, lineHeight: "32px" },
  headlineSm: { fontFamily: "Inter", fontSize: "20px", fontWeight: 600, lineHeight: "28px" },
  bodyMd: { fontFamily: "Inter", fontSize: "16px", fontWeight: 400, lineHeight: "24px" },
  bodySm: { fontFamily: "Inter", fontSize: "14px", fontWeight: 400, lineHeight: "20px" },
  labelMd: { fontFamily: "Inter", fontSize: "12px", fontWeight: 600, lineHeight: "16px" },
} as const;

export const spacing = {
  sidebarLeft: "320px",
  sidebarRight: "360px",
  gutter: "1rem",
  marginMobile: "1rem",
  marginDesktop: "2rem",
} as const;

export const radius = {
  sm: "4px",
  base: "8px",
  md: "12px",
  full: "9999px",
} as const;

export const logoIdentity = {
  wordmark: "WhiskerWatch",
  accessibleName: "WhiskerWatch neighborhood lookout",
  mark: "WW",
  motif: "collar tag with watch ears",
  desktopMarkSize: "44px",
  mobileMarkSize: "40px",
  gap: "0.65rem",
} as const;

export const visualPrecisionCriteria = [
  "primary regions",
  "region order",
  "logo consistency",
  "header navigation",
  "color tokens",
  "typography",
  "desktop workbench grid",
  "mobile workbench stack",
  "radius",
  "buttons",
  "cards and panels",
  "inputs",
  "condition controls",
  "status controls",
  "map markers",
  "report list and patrol rows",
  "success state",
  "state treatments",
  "long text wrapping",
  "accessibility",
] as const;

export const conditionVisuals: Record<
  Condition,
  {
    icon: "tail" | "alert-ear" | "food-bowl";
    cue: string;
    symbol: string;
    toneClass: string;
    trailClass: string;
  }
> = {
  healthy: {
    icon: "tail",
    cue: "Stable tail cue",
    symbol: "TAIL",
    toneClass: "tone-healthy",
    trailClass: "trail-healthy",
  },
  injured: {
    icon: "alert-ear",
    cue: "Urgent alert-ear cue",
    symbol: "ALERT",
    toneClass: "tone-injured",
    trailClass: "trail-injured",
  },
  needs_food: {
    icon: "food-bowl",
    cue: "Food bowl support cue",
    symbol: "BOWL",
    toneClass: "tone-needs-food",
    trailClass: "trail-needs-food",
  },
};

export const statusVisuals: Record<
  ReportStatus,
  { icon: "collar-tag" | "watch-eye" | "helped-paw" | "check-tag" | "moon-tail"; cue: string; symbol: string }
> = {
  reported: { icon: "collar-tag", cue: "Collar tag stage", symbol: "TAG" },
  monitoring: { icon: "watch-eye", cue: "Watchful eye stage", symbol: "EYE" },
  helped: { icon: "helped-paw", cue: "Helped paw stage", symbol: "PAW" },
  resolved: { icon: "check-tag", cue: "Checked collar tag stage", symbol: "OK" },
  closed: { icon: "moon-tail", cue: "Quiet closed stage", symbol: "MOON" },
};
