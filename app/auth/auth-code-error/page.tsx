'use client'

import Link from 'next/link'
import PanafricanButton from '@/components/shared/PanafricanButton'

export default function AuthCodeError() {
    return (
        <div className="w-full max-w-sm text-center space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-red-500">Verification Failed</h1>
                <p className="text-sm text-muted-foreground">
                    The verification link may have expired or already been used.
                </p>
            </div>

            <div className="space-y-3">
                <Link href="/auth/login">
                    <PanafricanButton className="w-full">
                        Try Logging In
                    </PanafricanButton>
                </Link>
                <Link href="/auth/register" className="block text-sm text-muted-foreground hover:underline">
                    Create a new account
                </Link>
            </div>
        </div>
    )
}
