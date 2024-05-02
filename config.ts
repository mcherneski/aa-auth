import { createConfig } from '@alchemy/aa-alchemy/config'
import { baseSepolia } from '@alchemy/aa-core'

export const config = createConfig({
    rpcUrl: '/api/rpc',
    chain: baseSepolia
})
