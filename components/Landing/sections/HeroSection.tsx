import { Button } from '@/components/ui/button'
import { Section } from '@/components/Landing/shared/Section'

export function HeroSection() {
    return (
        <Section as='section' contentClassName='text-center py-20' className='bg-linear-to-r from-primary/10 to-secondary/10'>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
                    Create, Manage & Grow Events with <span className="text-primary">Real-Time Power</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Empower your events with live voting, seamless ticket sales, and powerful analytics. From community polls to sold-out conferences, EventFlow makes it effortless.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="text-lg px-8 py-3">Get Started Free</Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-3">Watch Demo</Button>
                </div>
            </div>
        </Section>
    )
}