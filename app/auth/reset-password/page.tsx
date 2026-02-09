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
import { createClient } from '@/utils/supabase/client'
import { Loader2, KeyRound, CheckCircle } from 'lucide-react'

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
    const [checking, setChecking] = useState(true)
    const [hasSession, setHasSession] = useState(false)
    const [success, setSuccess] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    useEffect(() => {
        const checkSession = async () => {
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()
            setHasSession(!!session)
            setChecking(false)
        }
        checkSession()
    }, [])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setSubmitting(true)
        const { error } = await updatePassword(data.password)
        setSubmitting(false)

        if (error) {
            form.setError('root', { message: error.message })
            return
        }

        setSuccess(true)
    }

    if (checking) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-100 text-center">
                    <CardContent className="py-8">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!hasSession) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-100 text-center">
                    <CardHeader>
                        <CardTitle>Session Expired</CardTitle>
                        <CardDescription>
                            Your reset link has expired or is invalid. Please request a new one.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push('/auth/forgot-password')}>
                            Request New Reset Link
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-100 text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle>Password Updated!</CardTitle>
                        <CardDescription>
                            Your password has been successfully reset.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => router.push('/auth/login')}>
                            Sign In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary/30">
            <Card className="w-100">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <KeyRound className="h-16 w-16 text-primary" />
                    </div>
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
                                            <Input type="password" placeholder="••••••••" {...field} />
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
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.root && (
                                <p className="text-sm text-center text-destructive">
                                    {form.formState.errors.root.message}
                                </p>
                            )}
                            <Button type="submit" className="w-full" disabled={submitting || loading}>
                                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Update Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
