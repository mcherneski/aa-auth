// Code Generated with love
'use client'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Form,
    FormControl, 
    FormField,
    FormItem,
    FormLabel,
    FormMessage
 } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { RegisterSchema } from '@/schemas'
import { useAuthenticate } from '@alchemy/aa-alchemy/react'

export default function RegisterPage() {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            username: '',
        }
    })
    
    const { authenticate, isPending, error } = useAuthenticate({
        onSuccess: (user) => {
            console.log('Register Successful', user)
        },
        onError: (error) => {
            console.error('Register Error', error)
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        console.log('Client side form values: ', values)
        
        

        const reqBody = JSON.stringify({
            email: values.email, 
            username: values.username
        })
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Register for an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder='Email Address'
                                            type='email'
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            {...field}
                                            placeholder='Username'
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type='submit' variant='default' disabled={isPending}>Register</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div>Already have an account?</div>
                </CardFooter>
            </Card>
        </>
    )
}