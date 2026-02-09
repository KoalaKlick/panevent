'use client'

import { createClient } from '@/utils/supabase/client'
import { buildAuthCallbackUrl } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { User, Session } from '@/types/auth'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session)
                setUser(session?.user ?? null)
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [supabase.auth])

    const signInWithOtp = async (email: string) => {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: buildAuthCallbackUrl('magiclink'),
            },
        })
        return { error }
    }

    // Send password reset email with link
    const resetPasswordForEmail = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: buildAuthCallbackUrl('recovery'),
        })
        return { error }
    }

    // Send password reset OTP code (no redirect, just the code)
    const sendRecoveryOtp = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        return { error }
    }

    const updatePassword = async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        })
        return { error }
    }

    const signInWithPassword = async ({ email, password }: { email: string, password: string }) => {
        // Clear any existing session first
        await supabase.auth.signOut()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (!error && data.user) {
            router.push('/dashboard')
        }

        return { error }
    }

    const signUp = async ({ email, password, full_name, phone }: { email: string, password: string, full_name: string, phone: string }) => {
        // Clear any existing session first
        await supabase.auth.signOut()

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name,
                    phone,
                },
                emailRedirectTo: buildAuthCallbackUrl('signup'),
            },
        })
        return { error }
    }

    const signInWithOAuth = async (provider: 'google') => {
        // Clear any existing session first
        await supabase.auth.signOut()

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: buildAuthCallbackUrl(),
            },
        })
        return { error }
    }

    const verifyOtp = async (email: string, token: string, type: 'email' | 'signup' | 'invite' | 'recovery' | 'magiclink' = 'email') => {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type,
        })
        return { data, error }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
    }

    return {
        user,
        session,
        loading,
        signInWithOtp,
        signInWithPassword,
        signUp,
        signInWithOAuth,
        verifyOtp,
        resetPasswordForEmail,
        sendRecoveryOtp,
        updatePassword,
        signOut,
    }
}
