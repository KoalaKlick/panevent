'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from '@/hooks/use-auth'
import { useState } from 'react'

const FormSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
})

export default function ForgotPasswordPage() {
    const { resetPasswordForEmail, loading } = useAuth()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setSubmitting(true)
        const { error } = await resetPasswordForEmail(data.email)
        setSubmitting(false)

        if (error) {
            form.setError('root', { message: error.message })
            return
        }

        setSuccess(true)
    }

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Check Your Email</CardTitle>
                        <CardDescription>
                            We've sent you a password reset link. Please check your email and click the link to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                        <Button
                            variant="outline"
                            onClick={() => router.push('/auth/login')}
                        >
                            Back to Login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary/30">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>Enter your email address and we'll send you a reset link.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.root && (
                                <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
                            )}
                            <Button type="submit" className="w-full" disabled={submitting || loading}>
                                {submitting ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Remember your password? <a href="/auth/login" className="underline hover:text-primary">Sign in</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
