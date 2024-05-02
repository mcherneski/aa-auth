import * as z from 'zod'

export const NewAccountSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    username: z.string()
    .min(3, {
        message: 'Username must be at least 3 characters'
    })
    .max(20, {
        message: 'Username must be less than 20 characters'
    }),
    wallet: z.string().refine(wallet => wallet.startsWith('0x') && wallet.length === 42, {
        message: 'Invalid wallet address'
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    username: z.string()
    .min(3, {
        message: 'Username must be at least 3 characters'
    })
    .max(20, {
        message: 'Username must be less than 20 characters'
    })
})

export const LoginSchema = z.object({
    username: z.string()
    .min(3, {
        message: 'Username must be at least 3 characters'
    })
    .max(20, {
        message: 'Username must be less than 20 characters'
    })
})