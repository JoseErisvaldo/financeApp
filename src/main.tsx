import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AppRouter } from "./app-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { GlobalError } from "./components/layout/error-global/error-global";
import RouteFallback from "./components/route-fallback";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<GlobalError />}>
        <Suspense fallback={<RouteFallback />}>
          <AppRouter />
        </Suspense>
      </ErrorBoundary>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
);
