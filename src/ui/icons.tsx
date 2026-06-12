import type React from "react";
import { logoIdentity } from "./designTokens";

type IconProps = {
  className?: string;
  title?: string;
};

function IconShell({ className = "", title, children }: React.PropsWithChildren<IconProps>) {
  return (
    <span className={`cat-icon ${className}`} aria-hidden={title ? undefined : true} aria-label={title}>
      {children}
    </span>
  );
}

export function WhiskerWatchLogo({ className = "", title = logoIdentity.accessibleName }: IconProps) {
  return (
    <span className={`ww-logo ${className}`} aria-label={title} role="img">
      <span className="ww-logo-mark" aria-hidden="true">{logoIdentity.mark}</span>
      <span className="ww-logo-wordmark">{logoIdentity.wordmark}</span>
    </span>
  );
}

export function CollarTagIcon(props: IconProps) {
  return <IconShell {...props}>TAG</IconShell>;
}

export function PawDropIcon(props: IconProps) {
  return <IconShell {...props}>PIN</IconShell>;
}

export function WhiskerDivider(props: IconProps) {
  return <IconShell className={`whisker-divider ${props.className ?? ""}`} title={props.title}>---</IconShell>;
}

export function AlertEarIcon(props: IconProps) {
  return <IconShell {...props}>!</IconShell>;
}

export function FoodBowlIcon(props: IconProps) {
  return <IconShell {...props}>BOWL</IconShell>;
}

export function HelpedPawIcon(props: IconProps) {
  return <IconShell {...props}>PAW</IconShell>;
}

export function CatHeadMarkerIcon(props: IconProps) {
  return <IconShell {...props}>CAT</IconShell>;
}

export function WatchEyeIcon(props: IconProps) {
  return <IconShell {...props}>EYE</IconShell>;
}

export function MoonTailIcon(props: IconProps) {
  return <IconShell {...props}>MOON</IconShell>;
}

export function CameraCatEyeIcon(props: IconProps) {
  return <IconShell {...props}>CAM</IconShell>;
}

export function TailSignalIcon(props: IconProps) {
  return <IconShell {...props}>TAIL</IconShell>;
}
