
"use client"
import {
  
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { useState } from 'react'

const options:any={
  defaultOptions:{
      queries:{
        refetchOnWindowFocus:true
      }
  }
}
export default function UseQuery({children,}: {children: React.ReactNode}) {
  const [queryClient] = useState(()=>new QueryClient(options))
  return (
    <QueryClientProvider client={queryClient}>
      
        {children}

    </QueryClientProvider>
  )
}
