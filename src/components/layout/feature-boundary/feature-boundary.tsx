import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";

type FeatureBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  errorFallback: React.ComponentType<FallbackProps>;
};

export function FeatureBoundary({
  children,
  fallback,
  errorFallback,
}: FeatureBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
