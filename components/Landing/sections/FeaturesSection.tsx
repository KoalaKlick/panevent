import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from '@/components/Landing/shared/Section'
import {  Users, BarChart3, Ticket, Zap, Shield, Globe } from 'lucide-react'

export function FeaturesSection() {
    return (
        <Section id="features" as="section" contentClassName="py-20" className="scroll-mt-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features for Every Event</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Everything you need to create engaging, real-time events that captivate your audience.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <BarChart3 className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Real-Time Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Track live views, votes, and ticket sales with detailed dashboards and instant insights.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Users className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Live Voting & Polls</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Engage your audience with interactive polls and see results update in real-time.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Ticket className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Seamless Ticketing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Sell tickets effortlessly with integrated payment processing and automated check-ins.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Globe className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Beautiful Public Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Create stunning event pages that look professional and drive registrations.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Zap className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Multiple Event Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            From webinars to conferences, support all event formats in one unified platform.
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Shield className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Secure & Scalable</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Enterprise-grade security with unlimited scalability for events of any size.
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </Section>
    )
}