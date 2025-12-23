'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="card p-8 text-center">
      <h2 className="text-2xl font-bold text-foreground mb-4">Error</h2>
      <p className="text-muted mb-4">{error.message}</p>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}

