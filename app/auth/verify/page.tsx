'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

export default function VerificationPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [verificationStatus, setVerificationStatus] = useState<'waiting' | 'verified' | 'error'>('waiting')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        // Get email from URL params
        const params = new URLSearchParams(window.location.search)
        const emailParam = params.get('email')
        if (emailParam) {
            setEmail(emailParam)
        }

        // Set up real-time auth state listener using Supabase's built-in onAuthStateChange
        const supabase = createClient()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state changed:', event, session)

                // When user clicks email confirmation link, they get authenticated
                if (event === 'SIGNED_IN' && session) {
                    console.log('User signed in via email verification')
                    setVerificationStatus('verified')

                    // Automatically redirect to dashboard
                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 1500)
                }

                // Handle email verification updates
                if (event === 'USER_UPDATED' && session) {
                    if (session.user.email_confirmed_at) {
                        console.log('Email confirmed')
                        setVerificationStatus('verified')

                        setTimeout(() => {
                            router.push('/dashboard')
                        }, 1500)
                    }
                }
            }
        )

        // Check if user is already verified
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user.email_confirmed_at) {
                setVerificationStatus('verified')
                setTimeout(() => {
                    router.push('/dashboard')
                }, 1500)
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [router])

    const handleResendEmail = async () => {
        if (!email) return

        const supabase = createClient()
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
        })

        if (error) {
            setErrorMessage(error.message)
        } else {
            setErrorMessage('')
            alert('Verification email resent! Please check your inbox.')
        }
    }

    if (verificationStatus === 'verified') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-secondary/30">
                <Card className="w-[400px]">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <CardTitle className="text-center">✓ Email Verified!</CardTitle>
                        <CardDescription className="text-center">
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
            <Card className="w-[400px]">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <svg className="animate-pulse h-16 w-16 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                    </div>
                    <CardTitle className="text-center">Check Your Email</CardTitle>
                    <CardDescription className="text-center">
                        We sent a verification link to {email && <strong className="block mt-1">{email}</strong>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block animate-pulse h-2 w-2 rounded-full bg-blue-500"></span>
                            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                Waiting for email verification...
                            </p>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                            Click the link in your email to automatically verify and sign in
                        </p>
                    </div>

                    <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
                        <p className="font-medium mb-2">What happens next:</p>
                        <ol className="list-decimal list-inside space-y-1 text-xs">
                            <li>Check your email inbox (and spam folder)</li>
                            <li>Click the verification link</li>
                            <li>You'll be automatically signed in</li>
                            <li>This page will redirect you to the dashboard</li>
                        </ol>
                    </div>

                    {errorMessage && (
                        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
                            <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
                        </div>
                    )}

                    <div className="pt-4 space-y-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleResendEmail}
                        >
                            Resend Verification Email
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full text-sm"
                            onClick={() => router.push('/auth/login')}
                        >
                            ← Back to Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
