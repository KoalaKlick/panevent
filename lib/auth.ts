export type AuthCallbackType = 'signup' | 'magiclink' | 'recovery' | undefined

export const AUTH_CALLBACK_PATH = '/auth/callback'

// Build the Supabase auth callback URL consistently on the client.
// Maps to /auth/callback with an optional `type` query param.
export function buildAuthCallbackUrl(type?: AuthCallbackType): string {
    if (typeof window === 'undefined') {
        // Fallback – should not normally be hit from client hooks/components.
        return type ? `${AUTH_CALLBACK_PATH}?type=${type}` : AUTH_CALLBACK_PATH
    }

    const base = `${window.location.origin}${AUTH_CALLBACK_PATH}`
    return type ? `${base}?type=${type}` : base
}

// Supabase resend-protection error example:
// "For security purposes, you can only request this after 91 seconds."
// This helper pulls out the "91" so the UI can show a live countdown.
export function parseResendCooldownSeconds(message: string): number | null {
    const match = message.match(/after\s+(\d+)\s+seconds/i)
    if (!match) return null
    const seconds = parseInt(match[1], 10)
    if (Number.isNaN(seconds)) return null
    return seconds
}

