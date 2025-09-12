'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'




function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // ms단위, 1분
          gcTime: 1000 * 60 * 10, // 10분
          refetchOnWindowFocus: true, // 탭 포커스 됐을 때 refetch 여부
          refetchIntervalInBackground: true, // 백그라운드 refetch 여부
          retry: 1, // fetch 시도 횟수
        }
      }
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default QueryProvider