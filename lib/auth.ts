export type AuthCallbackType = 'signup' | 'recovery' | undefined

export const AUTH_CALLBACK_PATH = '/auth/callback'

export function buildAuthCallbackUrl(type?: AuthCallbackType): string {
    if (typeof window === 'undefined') {
        return type ? `${AUTH_CALLBACK_PATH}?type=${type}` : AUTH_CALLBACK_PATH
    }

    const base = `${window.location.origin}${AUTH_CALLBACK_PATH}`
    return type ? `${base}?type=${type}` : base
}

