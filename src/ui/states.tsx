import { AlertEarIcon, CollarTagIcon, HelpedPawIcon, PawDropIcon } from "./icons";

export function EmptyState({ message, action }: { message: string; action?: React.ReactNode }) {
  return (
    <div className="state state-empty" role="status">
      <CollarTagIcon />
      <p><span className="sr-only">Quiet windowsill: </span>{message}</p>
      {action}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="state state-error" role="alert">
      <AlertEarIcon />
      <span>{message}</span>
    </div>
  );
}

export function LoadingState({ message }: { message: string }) {
  return (
    <div className="state state-loading" role="status" aria-live="polite">
      <PawDropIcon />
      <span>{message}</span>
    </div>
  );
}

export function SuccessState({ message }: { message: string }) {
  return (
    <div className="state state-success" role="status" aria-live="polite">
      <HelpedPawIcon />
      <span>{message}</span>
    </div>
  );
}
