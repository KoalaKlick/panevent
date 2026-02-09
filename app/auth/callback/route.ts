import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')

    const supabase = await createClient()

    // Handle PKCE flow (code-based)
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return redirectTo(request, origin, type === 'recovery' ? '/auth/reset-password' : '/auth/confirmed')
        }
        console.error('Code exchange error:', error)
    }

    // Handle token_hash flow (email confirmation, password recovery)
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as 'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change' | 'email',
        })
        if (!error) {
            const redirectUrl = type === 'recovery' ? '/auth/reset-password' : '/auth/confirmed'
            return redirectTo(request, origin, redirectUrl)
        }
        console.error('Token verification error:', error)
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

function redirectTo(request: Request, origin: string, path: string) {
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocalEnv = process.env.NODE_ENV === 'development'

    if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${path}`)
    }
    if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${path}`)
    }
    return NextResponse.redirect(`${origin}${path}`)
}
