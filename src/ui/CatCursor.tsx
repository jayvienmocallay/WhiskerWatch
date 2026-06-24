import { useEffect } from "react";

const PAW_DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <ellipse cx="16" cy="20" rx="5" ry="4" fill="#1F2A24"/>
  <circle cx="8" cy="14" r="2.8" fill="#1F2A24"/>
  <circle cx="12" cy="11" r="2.8" fill="#1F2A24"/>
  <circle cx="20" cy="11" r="2.8" fill="#1F2A24"/>
  <circle cx="24" cy="14" r="2.8" fill="#1F2A24"/>
</svg>`;

const PAW_POINTER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <ellipse cx="16" cy="20" rx="5" ry="4" fill="#256F55"/>
  <circle cx="8" cy="14" r="2.8" fill="#256F55"/>
  <circle cx="12" cy="11" r="2.8" fill="#256F55"/>
  <circle cx="20" cy="11" r="2.8" fill="#256F55"/>
  <circle cx="24" cy="14" r="2.8" fill="#256F55"/>
  <line x1="8" y1="11" x2="6" y2="7" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="8" y1="11" x2="8" y2="6.5" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="8" y1="11" x2="10" y2="7" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="12" y1="8" x2="10" y2="4" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="12" y1="8" x2="12" y2="3.5" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="12" y1="8" x2="14" y2="4" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="8" x2="18" y2="4" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="8" x2="20" y2="3.5" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="20" y1="8" x2="22" y2="4" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="24" y1="11" x2="22" y2="7" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="24" y1="11" x2="24" y2="6.5" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="24" y1="11" x2="26" y2="7" stroke="#256F55" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;

function svgToDataUri(svg: string): string {
  return `url("data:image/svg+xml;base64,${btoa(svg)}")`;
}

export function useCatCursor(): void {
  useEffect(() => {
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const defaultUri = svgToDataUri(PAW_DEFAULT_SVG);
    const pointerUri = svgToDataUri(PAW_POINTER_SVG);
    const style = document.createElement("style");
    style.id = "cat-cursor-style";
    style.textContent = `
      * { cursor: ${defaultUri} 4 4, auto !important; }
      button, a, [role="button"], label,
      .nav-button, .patrol-row, .report-list-item,
      .segmented label, .filter-row label,
      input[type="checkbox"], input[type="radio"],
      select, .cat-tag-popup {
        cursor: ${pointerUri} 4 4, pointer !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("cat-cursor-style")?.remove();
    };
  }, []);
}
