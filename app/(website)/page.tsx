import { HeroSection } from '@/components/Landing/sections/HeroSection'
import { FeaturesSection } from '@/components/Landing/sections/FeaturesSection' 
import { HowItWorksSection } from '@/components/Landing/sections/HowItWorksSection'
import { TestimonialsSection } from '@/components/Landing/sections/TestimonialsSection'
import { PricingSection } from '@/components/Landing/sections/PricingSection'
import { FAQSection } from '@/components/Landing/sections/FAQSection'
import { FinalCTASection } from '@/components/Landing/sections/FinalCTASection'
import { FooterSection } from '@/components/Landing/sections/FooterSection'
import { Navbar } from '@/components/Landing/nav/NavBar'
import { EventsSection } from '@/components/Landing/sections/events'

const page = () => {
  return (
    <div className='bg-linear-to-br max-w-svw overflow-x-clip from-slate-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen'>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <EventsSection/>
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  )
}

export default page