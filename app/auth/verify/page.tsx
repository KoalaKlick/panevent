'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Mail, Loader2, CheckCircle } from 'lucide-react'

function VerificationContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email] = useState(searchParams.get('email') || '')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [resending, setResending] = useState(false)
    const [cooldown, setCooldown] = useState<number | null>(null)
    const [verified, setVerified] = useState(false)

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError('Please enter the 6-digit code')
            return
        }

        setSubmitting(true)
        setError('')

        const supabase = createClient()
        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'email',
        })

        if (error) {
            setError(error.message)
            setSubmitting(false)
            return
        }

        setVerified(true)
        setTimeout(() => router.push('/dashboard'), 1500)
    }

    const handleResend = async () => {
        if (!email || cooldown !== null) return
        setResending(true)
        setError('')
        const supabase = createClient()
        const { error } = await supabase.auth.resend({ type: 'signup', email })
        if (error) {
            // Check for rate limit
            const match = error.message.match(/(\d+)\s*second/)
            if (match) {
                setCooldown(parseInt(match[1]))
            } else {
                setError(error.message)
            }
        } else {
            alert('Verification code resent!')
        }
        setResending(false)
    }

    // Cooldown timer
    useEffect(() => {
        if (cooldown === null) return
        const interval = setInterval(() => {
            setCooldown((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(interval)
                    return null
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [cooldown])

    if (verified) {
        return (
            <Card className="w-100 text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle>Email Verified!</CardTitle>
                    <CardDescription>Redirecting to dashboard...</CardDescription>
                </CardHeader>
                <CardContent>
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-100">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <Mail className="h-16 w-16 text-primary" />
                </div>
                <CardTitle>Verify Your Email</CardTitle>
                <CardDescription>
                    Enter the 6-digit code sent to
                    {email && <strong className="block mt-1">{email}</strong>}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                        <p className="text-sm text-destructive text-center">{error}</p>
                    </div>
                )}

                <Button className="w-full" onClick={handleVerify} disabled={submitting || otp.length !== 6}>
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Verify Email
                </Button>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleResend}
                        disabled={resending || cooldown !== null}
                    >
                        {resending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {cooldown !== null ? `Resend in ${cooldown}s` : 'Resend Code'}
                    </Button>
                    <Button variant="ghost" className="flex-1" onClick={() => router.push('/auth/login')}>
                        Back to Login
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default function VerificationPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary/30">
            <Suspense fallback={
                <Card className="w-100 text-center">
                    <CardContent className="py-8">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    </CardContent>
                </Card>
            }>
                <VerificationContent />
            </Suspense>
        </div>
    )
}
