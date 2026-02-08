'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from '@/hooks/use-auth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: 'Your one-time password must be 6 characters.',
    }),
})

export default function VerificationPage() {
    const { verifyOtp, loading } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [isWaitingForEmail, setIsWaitingForEmail] = useState(true)
    const [verificationStatus, setVerificationStatus] = useState<'waiting' | 'verified' | 'error'>('waiting')

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: '',
        },
    })

    useEffect(() => {
        // Get email from URL params
        const params = new URLSearchParams(window.location.search)
        const emailParam = params.get('email')
        if (emailParam) {
            setEmail(emailParam)
        }

        // Set up WebSocket listener for real-time auth state changes
        const supabase = createClient()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state changed:', event, session)

                // When user clicks email confirmation link, they get authenticated
                if (event === 'SIGNED_IN' && session) {
                    setVerificationStatus('verified')
                    setIsWaitingForEmail(false)

                    // Automatically redirect to dashboard
                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 1500)
                }

                if (event === 'USER_UPDATED' && session) {
                    setVerificationStatus('verified')
                    setIsWaitingForEmail(false)

                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 1500)
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [router])

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (!email) {
            console.error("Email not found for verification")
            return
        }

        const { error } = await verifyOtp(email, data.pin, 'signup')

        if (error) {
            form.setError('root', { message: error.message })
            setVerificationStatus('error')
        } else {
            setVerificationStatus('verified')
        }
    }

    if (verificationStatus === 'verified') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>✓ Email Verified!</CardTitle>
                        <CardDescription>
                            Your email has been successfully verified. Redirecting to dashboard...
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary/30">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Verify Account</CardTitle>
                    <CardDescription>
                        {isWaitingForEmail
                            ? "Check your email and click the confirmation link, or enter the OTP below."
                            : "Enter the One-Time Password sent to your email."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isWaitingForEmail && (
                        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                <span className="inline-block animate-pulse mr-2">●</span>
                                Waiting for email confirmation...
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                Click the link in your email to automatically verify
                            </p>
                        </div>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup className="justify-center w-full">
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormDescription>
                                            Enter the 6-digit code from your email
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {form.formState.errors.root && (
                                <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
                            )}
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
