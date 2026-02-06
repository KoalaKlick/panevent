import { Section } from '@/components/Landing/shared/Section'

export function HowItWorksSection() {
    return (
        <Section id="about" as="section" contentClassName="py-20 bg-gray-50 dark:bg-gray-800" className="scroll-mt-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">Get your event up and running in minutes</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                    <p className="text-gray-600 dark:text-gray-300">Create your free account and set up your profile</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Create Event</h3>
                    <p className="text-gray-600 dark:text-gray-300">Choose your event type and customize with our easy builder</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Share & Promote</h3>
                    <p className="text-gray-600 dark:text-gray-300">Share your event page and promote across your networks</p>
                </div>
                <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
                    <h3 className="text-xl font-semibold mb-2">Track Results</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monitor live engagement and analyze performance</p>
                </div>
            </div>
        </Section>
    )
}