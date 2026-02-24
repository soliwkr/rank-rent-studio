import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

export function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });

  const { hook } = memoryLocation({ path: url, static: true });

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router hook={hook}>
          <div id="ssr-shell" />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );

  return { html };
}
