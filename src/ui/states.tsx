export function EmptyState({ message, action }: { message: string; action?: React.ReactNode }) {
  return (
    <div className="state state-empty" role="status">
      <p><span className="sr-only">Quiet windowsill: </span>{message}</p>
      {action}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="state state-error" role="alert">
      <span>{message}</span>
    </div>
  );
}

export function LoadingState({ message }: { message: string }) {
  return (
    <div className="state state-loading" role="status" aria-live="polite">
      <span>{message}</span>
    </div>
  );
}

export function SuccessState({ message }: { message: string }) {
  return (
    <div className="state state-success" role="status" aria-live="polite">
      <span>{message}</span>
    </div>
  );
}
