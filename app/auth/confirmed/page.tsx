'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function EmailConfirmedPage() {
    const router = useRouter()

    return (
        <div className="w-full max-w-sm text-center space-y-6">
            <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Email Confirmed!</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Your email has been successfully verified.
                </p>
            </div>
            <p className="text-sm text-muted-foreground">
                You can close this tab and return to where you were signing up, 
                or continue to the dashboard from here.
            </p>
            <Button 
                className="w-full" 
                onClick={() => router.push('/dashboard')}
            >
                Continue to Dashboard
            </Button>
        </div>
    )
}
