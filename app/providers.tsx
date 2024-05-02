'use client'

import { config } from '@/config'
import { AlchemyAccountProvider } from '@alchemy/aa-alchemy/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { Suspense, PropsWithChildren } from 'react'

const queryClient = new QueryClient()

export const Providers = (props: PropsWithChildren, session: any) => {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <AlchemyAccountProvider config={config} queryClient={queryClient}>
                    <SessionProvider session={session}>
                        {props.children}
                    </SessionProvider>
                </AlchemyAccountProvider>
            </QueryClientProvider>
        </Suspense>
    )
}

