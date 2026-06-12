import { describe, expect, it } from "vitest";
import { designColors, logoIdentity, radius, spacing, typography, visualPrecisionCriteria } from "../../src/ui/designTokens";
import { conditionVocabulary, statusVocabulary } from "../../src/ui/statusVocabulary";

describe("Stitch design tokens", () => {
  it("contains required Stitch palette and shape tokens", () => {
    expect(designColors.mossCollar).toBe("#256F55");
    expect(designColors.tunaGold).toBe("#F2C14E");
    expect(designColors.gingerAlert).toBe("#E95F45");
    expect(radius.base).toBe("8px");
    expect(spacing.sidebarLeft).toBe("320px");
  });

  it("uses Inter typography and non-color cues for statuses and conditions", () => {
    expect(typography.bodyMd.fontFamily).toBe("Inter");
    expect(conditionVocabulary.injured.cue).toMatch(/alert/i);
    expect(conditionVocabulary.needs_food.symbol).toBe("BOWL");
    expect(statusVocabulary.monitoring.cue).toMatch(/eye/i);
  });

  it("defines reusable logo identity and visual precision criteria", () => {
    expect(logoIdentity.wordmark).toBe("WhiskerWatch");
    expect(logoIdentity.accessibleName).toMatch(/neighborhood lookout/i);
    expect(logoIdentity.desktopMarkSize).toBe("44px");
    expect(visualPrecisionCriteria).toHaveLength(20);
    expect(visualPrecisionCriteria).toContain("logo consistency");
  });
});
