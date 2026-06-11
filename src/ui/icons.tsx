import type React from "react";

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

export function CollarTagIcon(props: IconProps) {
  return <IconShell {...props}>◇</IconShell>;
}

export function PawDropIcon(props: IconProps) {
  return <IconShell {...props}>◖</IconShell>;
}

export function WhiskerDivider(props: IconProps) {
  return <IconShell className={`whisker-divider ${props.className ?? ""}`} title={props.title}>⌁</IconShell>;
}

export function AlertEarIcon(props: IconProps) {
  return <IconShell {...props}>▲</IconShell>;
}

export function FoodBowlIcon(props: IconProps) {
  return <IconShell {...props}>◡</IconShell>;
}

export function HelpedPawIcon(props: IconProps) {
  return <IconShell {...props}>●</IconShell>;
}

export function CatHeadMarkerIcon(props: IconProps) {
  return <IconShell {...props}>ᗢ</IconShell>;
}

export function WatchEyeIcon(props: IconProps) {
  return <IconShell {...props}>◉</IconShell>;
}

export function MoonTailIcon(props: IconProps) {
  return <IconShell {...props}>◜</IconShell>;
}

export function CameraCatEyeIcon(props: IconProps) {
  return <IconShell {...props}>◍</IconShell>;
}
