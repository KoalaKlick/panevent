import { FooterSection } from '@/components/Landing/sections/FooterSection'
import { Navbar } from '@/components/Landing/nav/NavBar'


export default function DashboardLayout({
    children,
}: {
  readonly  children: React.ReactNode
}) {
    return (
        <div className="flex font-geist flex-col max-w-svw overflow-x-clip min-h-screen bg-white">
            <Navbar />
            <div className="flex flex-col">
                {children}
            </div>
            <FooterSection />
        </div>
    )
}