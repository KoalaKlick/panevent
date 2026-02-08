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
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from '@/hooks/use-auth'
import { useState, useEffect } from 'react'

const FormSchema = z.object({
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function ResetPasswordPage() {
    const { updatePassword, loading } = useAuth()
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    useEffect(() => {
        // Check if we have a valid session from the reset link
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')

        if (!accessToken) {
            setError('Invalid or expired reset link. Please request a new one.')
        }
    }, [])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setSubmitting(true)
        const { error } = await updatePassword(data.password)
        setSubmitting(false)

        if (error) {
            form.setError('root', { message: error.message })
            return
        }

        // Redirect to login with success message
        router.push('/auth/login?reset=success')
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Reset Link Invalid</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full"
                            onClick={() => router.push('/auth/forgot-password')}
                        >
                            Request New Reset Link
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary/30">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter your new password below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.root && (
                                <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
                            )}
                            <Button type="submit" className="w-full" disabled={submitting || loading}>
                                {submitting ? 'Updating...' : 'Update Password'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
