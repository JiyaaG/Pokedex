import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { api, trpcClientOptions } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <api.Provider client={api.createClient(trpcClientOptions)} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </api.Provider>
  );
}

export default MyApp;
