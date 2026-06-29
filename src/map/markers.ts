import type { CatReport, Condition } from "../features/reports/reportTypes";
import { conditionVocabulary, statusVocabulary } from "../ui/statusVocabulary";

export function markerClass(condition: Condition): string {
  return `marker cat-marker marker-${condition.replace("_", "-")}`;
}

export function markerAccessibleName(report: CatReport): string {
  const condition = conditionVocabulary[report.condition].label;
  const status = statusVocabulary[report.status].label;
  return `${condition} cat report, ${status}`;
}

export function markerSymbol(condition: Condition): string {
  return conditionVocabulary[condition].symbol;
}

export function markerHtml(condition: Condition): string {
  // Bright condition color is the cat head (the .cat-marker clip-path already
  // cuts the SVG into a head-with-ears silhouette). We draw a clean, cute face
  // on top: inner-ear tint, white eyes with dark pupils, a nose, soft mouth and
  // a couple of subtle tabby stripes. The full symbol stays in <desc> for the
  // accessible/non-SVG fallback (and the marker-ear hook the contract relies on).
  const palette: Record<Condition, { fill: string; shade: string }> = {
    healthy: { fill: "#5DBB78", shade: "#3F9A5C" },
    injured: { fill: "#E95F45", shade: "#C2452F" },
    needs_food: { fill: "#F2C14E", shade: "#D69A2C" },
  };
  const { fill, shade } = palette[condition];

  return `<svg viewBox='0 0 36 36' width='36' height='36' xmlns='http://www.w3.org/2000/svg'>
    <desc>${markerSymbol(condition)} marker-ear</desc>
    <circle cx='18' cy='18' r='17' fill='${fill}'/>
    <g fill='${shade}'>
      <polygon points='7,3 13,10 4,12'/>
      <polygon points='29,3 23,10 32,12'/>
    </g>
    <g fill='${shade}' opacity='0.55' stroke='none'>
      <path d='M18 6 Q16 9 18 12 Q20 9 18 6' />
    </g>
    <g fill='#FFFFFF'>
      <circle cx='13' cy='16.5' r='3.1'/>
      <circle cx='23' cy='16.5' r='3.1'/>
    </g>
    <g fill='#1F2A24'>
      <circle cx='13.6' cy='16.8' r='1.45'/>
      <circle cx='22.4' cy='16.8' r='1.45'/>
      <polygon points='18,20 16,22.2 20,22.2'/>
    </g>
    <path d='M18 22.2 Q15.5 24.6 13.5 23.2 M18 22.2 Q20.5 24.6 22.5 23.2' fill='none' stroke='#1F2A24' stroke-width='0.9' stroke-linecap='round' opacity='0.65'/>
    <g fill='#FFFFFF'>
      <circle cx='13.1' cy='16.2' r='0.55'/>
      <circle cx='21.9' cy='16.2' r='0.55'/>
    </g>
  </svg>`;
}
