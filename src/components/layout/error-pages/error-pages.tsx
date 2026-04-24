import type { FallbackProps } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";

export function ErrorPages({ resetErrorBoundary }: FallbackProps) {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.removeQueries({
      type: "all",
      predicate: (query) => query.state.error != null,
    });

    resetErrorBoundary();
  };

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <p className="text-sm text-red-500">Erro ao carregar dados</p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={handleRetry}
          className="rounded bg-green-900 px-4 py-2 text-white"
        >
          Tentar novamente
        </button>

        <button
          onClick={() => window.location.reload()}
          className="rounded border border-green-900 px-4 py-2 text-green-900"
        >
          Recarregar página
        </button>
      </div>
    </div>
  );
}
