import { Button } from '@/components/ui/button'

export function HeroSection() {
    return (
        <section className="relative min-h-screen w-full bg-[url(/landing/g.webp)] bg-cover bg-center bg-no-repeat bg-fixed">
            {/* Three-panel overlay - clips one continuous bg from parent */}
            <div className="flex min-h-screen items-stretch">
                {/* Left panel - transparent, shows parent bg through */}
                <div className="flex-1" />

                {/* Gap - Pan-African stripes (bg-fixed to match parent) */}
                <div className="w-2 md:w-2 bg- bg-fixed bg-[image:var(--bg-pan-african-stripes)]" />

                {/* Center panel - frosted glass over parent bg */}
                <div className="w-full max-w-6xl z-10 relative  backdrop-sepia backdrop-blur-md flex items-center justify-center px-4 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6 animate-fade-in">
                            Create, Manage & Grow Events with <span className="text-primary">Real-Time Power</span>
                        </h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
                            Empower your events with live voting, seamless ticket sales, and powerful analytics. From community polls to sold-out conferences, PanEvent makes it effortless.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-lg px-8 py-3">Get Started Free</Button>
                            <Button variant="outline" size="lg" className="text-lg px-8 py-3">Watch Demo</Button>
                        </div>
                    </div>
{/* Hero image with split effect - grayscale left, color right */}
                    <div className="hidden md:block absolute  -right-48 bottom-0 h-96">
                        {/* The actual image */}
                        <img className="h-96 w-auto" src="/landing/f.png" alt="Hero" />
                        {/* grayscale overlay - covers left portion */}
                        <div className="absolute inset-0 right-48 " />
                        {/* Color overlay - covers right w-48, no filter */}
                        <div className="absolute inset-0 left-auto backdrop-sepia w-48" />
                    </div>
                </div>

                {/* Gap - Pan-African stripes (bg-fixed to match parent) */}
                <div className="w-2 md:w-2 bg-fixed bg-[image:var(--bg-pan-african-stripes)]" />

                {/* Right panel - transparent to show colored overflow */}
                <div className="flex-1 backdrop- z-0 bg-amber-100/5" />
            </div>
        </section>
    )
}