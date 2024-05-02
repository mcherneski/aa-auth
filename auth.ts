import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import Credentials from 'next-auth/providers/credentials'


const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            id: 'aa-wallet',
            name: 'aa-Ethereum',
            credentials: {
                message: {
                    label: 'Message',
                    type: 'text',
                    placeholder: '0x0'
                },
                signature: {
                    label: 'Signature',
                    type: 'text',
                    placeholder: '0x0'
                }
            }, 
            authorize: async (credentials) => {

                try {
                    const siwe = new SiweMessage(
                        JSON.parse(credentials?.message as string),
                    )

                    const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string)

                    const result = await siwe.verify({
                        signature: credentials?.signature,
                        domain: nextAuthUrl.host,
                        nonce: await getCsrfToken()
                    })

                    if (result.success) {
                        //Get data from db for token info
                        return { id: siwe.address }
                    }
                    
                    return null

                } catch (e) {
                    return null
                }
            }
        })
    ],
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async session({ session, token }: {session: any, token: any}) {
            session.address = token.sub,
            session.user.name = token.sub,
            session.user.email = ''
            session.user.role = 'user'

            return session
        }
    }
})


// I don't think I need this.
// const handler = NextAuth(authOptions)

// export {handler as GET, handler as POST}