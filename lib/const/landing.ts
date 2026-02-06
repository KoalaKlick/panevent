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
    { id: 5, color: "#0cdcf7", label: "Night Five", image: "/landing/e.webp" },
    { id: 6, color: "#0cdcf7", label: "Night Six", image: "/landing/f.webp" },
    { id: 7, color: "#0cdcf7", label: "Night Seven", image: "/landing/g.webp" },
    { id: 8, color: "#0cdcf7", label: "Night Eight", image: "/landing/h.webp" },
    { id: 9, color: "#0cdcf7", label: "Night Nine", image: "/landing/i.webp" },
    { id: 10, color: "#0cdcf7", label: "Night Ten", image: "/landing/j.webp" },
    { id: 11, color: "#0cdcf7", label: "Night Eleven", image: "/landing/j.webp" },
    { id: 12, color: "#0cdcf7", label: "Night Twelve", image: "/landing/j.webp" },
    { id: 13, color: "#0cdcf7", label: "Night Thirteen", image: "/landing/j.webp" },
    { id: 14, color: "#0cdcf7", label: "Night Fourteen", image: "/landing/j.webp" },
    { id: 15, color: "#0cdcf7", label: "Night Fifteen", image: "/landing/j.webp" },
    { id: 16, color: "#0cdcf7", label: "Night Sixteen", image: "/landing/j.webp" },
    { id: 17, color: "#0cdcf7", label: "Night Seventeen", image: "/landing/j.webp" },
    { id: 18, color: "#0cdcf7", label: "Night Eighteen", image: "/landing/j.webp" },
    { id: 19, color: "#0cdcf7", label: "Night Nineteen", image: "/landing/j.webp" },
    { id: 20, color: "#0cdcf7", label: "Night Twenty", image: "/landing/j.webp" },
    { id: 21, color: "#0cdcf7", label: "Night Twenty-One", image: "/landing/j.webp" },
]