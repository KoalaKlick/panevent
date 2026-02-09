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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAuth } from '@/hooks/use-auth'
import { useState } from 'react'
import { Mail, KeyRound, Loader2, ArrowLeft } from 'lucide-react'

const EmailSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
})

const OtpSchema = z.object({
    otp: z.string().length(6, { message: 'Please enter the 6-digit code.' }),
})

type Method = 'link' | 'otp'
type Step = 'email' | 'sent' | 'otp-verify'

export default function ForgotPasswordPage() {
    const { resetPasswordForEmail, signInWithOtp, verifyOtp, loading } = useAuth()
    const router = useRouter()
    const [method, setMethod] = useState<Method>('link')
    const [step, setStep] = useState<Step>('email')
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const emailForm = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: { email: '' },
    })

    const otpForm = useForm<z.infer<typeof OtpSchema>>({
        resolver: zodResolver(OtpSchema),
        defaultValues: { otp: '' },
    })

    async function onEmailSubmit(data: z.infer<typeof EmailSchema>) {
        setSubmitting(true)
        setEmail(data.email)

        if (method === 'link') {
            const { error } = await resetPasswordForEmail(data.email)
            if (error) {
                emailForm.setError('root', { message: error.message })
                setSubmitting(false)
                return
            }
            setStep('sent')
        } else {
            const { error } = await signInWithOtp(data.email)
            if (error) {
                emailForm.setError('root', { message: error.message })
                setSubmitting(false)
                return
            }
            setStep('otp-verify')
        }
        setSubmitting(false)
    }

    async function onOtpSubmit(data: z.infer<typeof OtpSchema>) {
        setSubmitting(true)
        const { error } = await verifyOtp(email, data.otp, 'magiclink')
        if (error) {
            otpForm.setError('root', { message: error.message })
            setSubmitting(false)
            return
        }
        // OTP verified - user is now signed in, redirect to reset password
        router.push('/auth/reset-password')
    }

    // Step: Email sent (magic link)
    if (step === 'sent') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-100 text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <Mail className="h-16 w-16 text-primary" />
                        </div>
                        <CardTitle>Check Your Email</CardTitle>
                        <CardDescription>
                            We sent a password reset link to
                            <strong className="block mt-1">{email}</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Click the link in your email to reset your password.
                        </p>
                        <Button variant="outline" onClick={() => router.push('/auth/login')}>
                            Back to Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Step: OTP verification
    if (step === 'otp-verify') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-100">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <KeyRound className="h-16 w-16 text-primary" />
                        </div>
                        <CardTitle>Enter Verification Code</CardTitle>
                        <CardDescription>
                            We sent a 6-digit code to
                            <strong className="block mt-1">{email}</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...otpForm}>
                            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                                <FormField
                                    control={otpForm.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center">
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {otpForm.formState.errors.root && (
                                    <p className="text-sm text-center text-destructive">
                                        {otpForm.formState.errors.root.message}
                                    </p>
                                )}
                                <Button type="submit" className="w-full" disabled={submitting}>
                                    {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    Verify Code
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button variant="ghost" size="sm" onClick={() => setStep('email')}>
                            <ArrowLeft className="h-4 w-4 mr-2" /> Try different email
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    // Step: Enter email
    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary/30">
            <Card className="w-100">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>Choose how you'd like to reset your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant={method === 'link' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setMethod('link')}
                        >
                            <Mail className="h-4 w-4 mr-2" /> Email Link
                        </Button>
                        <Button
                            type="button"
                            variant={method === 'otp' ? 'default' : 'outline'}
                            className="flex-1"
                            onClick={() => setMethod('otp')}
                        >
                            <KeyRound className="h-4 w-4 mr-2" /> OTP Code
                        </Button>
                    </div>

                    <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                            <FormField
                                control={emailForm.control}
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
                            {emailForm.formState.errors.root && (
                                <p className="text-sm text-destructive">
                                    {emailForm.formState.errors.root.message}
                                </p>
                            )}
                            <Button type="submit" className="w-full" disabled={submitting || loading}>
                                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                {method === 'link' ? 'Send Reset Link' : 'Send OTP Code'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Remember your password?{' '}
                        <a href="/auth/login" className="underline hover:text-primary">Sign in</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
