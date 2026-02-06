export interface NavbarNavLink {
    href: string
    label: string
    active?: boolean
}

export const defaultNavigationLinks: NavbarNavLink[] = [
    { href: "#", label: "Home", active: true },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ" },
]

// Events Section Data
export interface EventItem {
    id: number
    color: string
    label: string
    image: string
}

export const eventItems: EventItem[] = [
    { id: 1, color: "#ff0088", label: "Night One", image: "/landing/a.webp" },
    { id: 2, color: "#dd00ee", label: "Night Two", image: "/landing/b.webp" },
    { id: 3, color: "#9911ff", label: "Night Three", image: "/landing/c.webp" },
    { id: 4, color: "#0d63f8", label: "Night Four", image: "/landing/d.webp" },
 { id: 5, color: "#0cdcf7", label: "Night Ten", image: "/landing/j.webp" },
]