import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/Landing/shared/Section'
import { Check } from 'lucide-react'

export function PricingSection() {
    return (
        <Section id="pricing" as="section" contentClassName="py-20 bg-gray-50 dark:bg-gray-800" className="">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">Choose the plan that fits your event needs</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Free</CardTitle>
                        <CardDescription>Perfect for getting started</CardDescription>
                        <div className="text-4xl font-bold">$0<span className="text-lg font-normal">/month</span></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Up to 3 events</li>
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Basic analytics</li>
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Email support</li>
                        </ul>
                        <Button className="w-full mt-6">Get Started</Button>
                    </CardContent>
                </Card>
                <Card className="border-primary border-2 relative">
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
                    <CardHeader>
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <CardDescription>For growing organizers</CardDescription>
                        <div className="text-4xl font-bold">$29<span className="text-lg font-normal">/month</span></div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Unlimited events</li>
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Advanced analytics</li>
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Priority support</li>
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Custom branding</li>
                        </ul>
                        <Button className="w-full mt-6">Start Free Trial</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Enterprise</CardTitle>
                        <CardDescription>For large organizations</CardDescription>
                        <div className="text-4xl font-bold">Custom</div>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Everything in Pro</li>
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />Dedicated account manager</li>
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />API access</li>
                            <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" />SLA guarantee</li>
                        </ul>
                        <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
                    </CardContent>
                </Card>
            </div>
        </Section>
    )
}