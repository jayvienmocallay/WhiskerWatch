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
  const fill = {
    healthy: "#5DBB78",
    injured: "#E95F45",
    needs_food: "#F2C14E",
  }[condition];
  const symbol = markerSymbol(condition).slice(0, 3);

  return `<svg viewBox='0 0 36 36' width='36' height='36' xmlns='http://www.w3.org/2000/svg'>
    <desc>${markerSymbol(condition)} marker-ear</desc>
    <circle cx='18' cy='18' r='16' fill='${fill}'/>
    <g fill='#1F2A24' opacity='0.34'>
      <polygon points='10,13 7,4 15,10'/>
      <polygon points='21,10 29,4 26,13'/>
      <circle cx='18' cy='19' r='11'/>
    </g>
    <g fill='#1F2A24'>
      <circle cx='14' cy='17' r='1.5'/>
      <circle cx='22' cy='17' r='1.5'/>
    </g>
    <text x='18' y='32' text-anchor='middle' font-size='8' font-weight='900' fill='#1F2A24' font-family='Inter,sans-serif'>${symbol}</text>
  </svg>`;
}
