'use server'

import * as z from 'zod'
import { NewAccountSchema } from '@/schemas'
import { db } from '@/lib/db'
import { getUserByEmail, getUserByUsername } from '@/data/user'
import { signIn } from 'next-auth/react'


export const register = async (values: z.infer<typeof NewAccountSchema>) => {
    const validatedFields = NewAccountSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: 'Invalid fields'}
    }

    const { email, username, wallet } = validatedFields.data

    const isExistingUser = await getUserByEmail(email)

    if (isExistingUser){
        return {error: 'Email already exists'}
    }

    const isExistingUsername = await getUserByUsername(username)

    if (isExistingUsername){
        return {error: 'Username already exists'}
    }

    try {
        await signIn('aa-wallet', {
            message: 
        })
    } catch (error) {
        console.error('Error signing in', error)
    }

    throw error
}