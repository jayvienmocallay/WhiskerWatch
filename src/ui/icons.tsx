import type React from "react";
import { logoIdentity } from "./designTokens";

type IconProps = {
  className?: string;
  title?: string;
};

function IconShell({ className = "", title, children }: React.PropsWithChildren<IconProps>) {
  return (
    <span
      className={`cat-icon ${className}`}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {children}
    </span>
  );
}

function IconSvg({ children }: React.PropsWithChildren) {
  return (
    <svg viewBox="0 0 20 20" width="1em" height="1em" fill="currentColor" focusable="false">
      {children}
    </svg>
  );
}

export function WhiskerWatchLogo({
  className = "",
  title = logoIdentity.accessibleName,
}: IconProps) {
  return (
    <span className={`ww-logo ${className}`} aria-label={title} role="img">
      <span className="ww-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
          <circle cx="12" cy="13" r="9" fill="#FFFFFF" />
          <polygon points="5,7 3,1 10,6" fill="#FFFFFF" />
          <polygon points="14,6 19,1 19,7" fill="#FFFFFF" />
          <ellipse cx="9" cy="11" rx="1.2" ry="1.5" fill="#256F55" />
          <ellipse cx="15" cy="11" rx="1.2" ry="1.5" fill="#256F55" />
          <polygon points="12,14 10.5,16 13.5,16" fill="#256F55" />
          <g stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" opacity="0.7">
            <line x1="9" y1="15" x2="3" y2="13.5" />
            <line x1="9" y1="16" x2="3" y2="16" />
            <line x1="9" y1="17" x2="3" y2="18.5" />
            <line x1="15" y1="15" x2="21" y2="13.5" />
            <line x1="15" y1="16" x2="21" y2="16" />
            <line x1="15" y1="17" x2="21" y2="18.5" />
          </g>
        </svg>
      </span>
      <span className="ww-logo-wordmark">{logoIdentity.wordmark}</span>
    </span>
  );
}

export function CollarTagIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <IconSvg>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v6A3.5 3.5 0 0 1 12.5 16h-5A3.5 3.5 0 0 1 4 12.5z" />
        <rect x="7" y="4" width="1.5" height="3" fill="var(--surface-container-lowest, #fff)" />
        <rect x="11.5" y="4" width="1.5" height="3" fill="var(--surface-container-lowest, #fff)" />
        <circle cx="10" cy="13.5" r="1.5" fill="var(--surface-container-lowest, #fff)" />
      </IconSvg>
    </IconShell>
  );
}

export function PawDropIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <IconSvg>
        <path d="M10 2a5.8 5.8 0 0 0-5.8 5.8c0 4.5 5.8 10.2 5.8 10.2s5.8-5.7 5.8-10.2A5.8 5.8 0 0 0 10 2" />
        <ellipse cx="10" cy="9.5" rx="2" ry="1.55" fill="var(--surface-container-lowest, #fff)" />
        <circle cx="7.5" cy="7.5" r="1" fill="var(--surface-container-lowest, #fff)" />
        <circle cx="10" cy="6.7" r="1" fill="var(--surface-container-lowest, #fff)" />
        <circle cx="12.5" cy="7.5" r="1" fill="var(--surface-container-lowest, #fff)" />
      </IconSvg>
    </IconShell>
  );
}

export function WhiskerDivider(props: IconProps) {
  return (
    <IconShell className={`whisker-divider ${props.className ?? ""}`} title={props.title}>
      <svg viewBox="0 0 20 20" width="1em" height="1em" fill="none" focusable="false">
        <line
          x1="4"
          y1="7"
          x2="16"
          y2="7"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="2"
          y1="10"
          x2="18"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="4"
          y1="13"
          x2="16"
          y2="13"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </IconShell>
  );
}

export function AlertEarIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <IconSvg>
        <polygon points="5,5 2.5,1.8 7,4" transform="rotate(-20 5 5)" />
        <polygon points="15,5 13,4 17.5,1.8" transform="rotate(20 15 5)" />
        <path
          d="M10 3 18 17H2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect x="9.15" y="7" width="1.7" height="5.2" rx="0.85" />
        <circle cx="10" cy="14.2" r="1" />
      </IconSvg>
    </IconShell>
  );
}

export function FoodBowlIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <IconSvg>
        <path d="M4 11a6 6 0 0 0 12 0z" />
        <line
          x1="3"
          y1="11"
          x2="6"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="11"
          x2="17"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <ellipse cx="10.5" cy="6" rx="3.2" ry="1.8" />
        <polygon points="7.5,6 4.5,4.2 4.5,7.8" />
        <circle cx="12" cy="5.5" r="0.35" fill="var(--surface-container-lowest, #fff)" />
      </IconSvg>
    </IconShell>
  );
}

export function HelpedPawIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <IconSvg>
        <ellipse cx="10" cy="13" rx="3" ry="2.5" />
        <circle cx="5.2" cy="8.2" r="1.8" />
        <circle cx="8.4" cy="6.2" r="1.8" />
        <circle cx="11.6" cy="6.2" r="1.8" />
        <circle cx="14.8" cy="8.2" r="1.8" />
      </IconSvg>
    </IconShell>
  );
}

export function CatHeadMarkerIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <IconSvg>
        <polygon points="5,5 3,1 8,4" />
        <polygon points="12,4 17,1 15,5" />
        <circle cx="10" cy="11" r="7" />
        <circle cx="7.5" cy="9" r="1" fill="var(--surface-container-lowest, #fff)" />
        <circle cx="12.5" cy="9" r="1" fill="var(--surface-container-lowest, #fff)" />
        <polygon points="10,12 8.7,13.5 11.3,13.5" fill="var(--surface-container-lowest, #fff)" />
      </IconSvg>
    </IconShell>
  );
}

export function WatchEyeIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <svg viewBox="0 0 20 20" width="1em" height="1em" fill="currentColor" focusable="false">
        <path
          d="M4 10s2.2-3.5 6-3.5S16 10 16 10s-2.2 3.5-6 3.5S4 10 4 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="10" cy="10" r="2" />
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <line x1="3" y1="8" x2="0.8" y2="7.5" />
          <line x1="3" y1="10" x2="0.5" y2="10" />
          <line x1="3" y1="12" x2="0.8" y2="12.5" />
          <line x1="17" y1="8" x2="19.2" y2="7.5" />
          <line x1="17" y1="10" x2="19.5" y2="10" />
          <line x1="17" y1="12" x2="19.2" y2="12.5" />
        </g>
      </svg>
    </IconShell>
  );
}

export function MoonTailIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <svg viewBox="0 0 20 20" width="1em" height="1em" fill="currentColor" focusable="false">
        <path fillRule="evenodd" d="M12.8 2.8a5 5 0 1 0 0 10 4.2 4.2 0 1 1 0-10" />
        <path
          d="M10 12.5c3 1.1 3 4.8-.2 5.2-1.8.2-3.1-.7-2.4-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </IconShell>
  );
}

export function CameraCatEyeIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <IconSvg>
        <rect x="3" y="6" width="14" height="10" rx="2" />
        <rect x="12.5" y="4.8" width="3" height="2" rx="0.6" />
        <circle cx="10" cy="11" r="3.5" fill="var(--surface-container-lowest, #fff)" />
        <ellipse cx="10" cy="11" rx="1" ry="2.5" />
      </IconSvg>
    </IconShell>
  );
}

export function TailSignalIcon(props: IconProps) {
  return (
    <IconShell {...props}>
      <svg viewBox="0 0 20 20" width="1em" height="1em" fill="none" focusable="false">
        <path
          d="M10 18C7 15 6 13 7.6 10.5 9 8.2 13 7.7 13 5.5c0-1.4 1-1.7 2-1.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconShell>
  );
}
