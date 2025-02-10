import "./globals.css"
import {Cairo} from "next/font/google"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {Home, Menu, MessageSquare} from "lucide-react"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {MunicipalityLogo} from "@/components/ui/MunicipalityLogo";

const cairo = Cairo({subsets: ["arabic"]})

export const metadata = {
    title: "مدينتي - نظام الشكاوى البلدية",
    description: "نظام شكاوى بلدية حديث قائم على الذكاء الاصطناعي",
}

export default function RootLayout({
                                       children
                                   }) {
    return (
        (<html lang="ar" dir="rtl">
        <body className={cn(cairo.className, "bg-[#0A1A2F] text-white min-h-screen")}>
        <nav
            className="bg-[#0A1A2F]/90 backdrop-blur-md text-white p-4 sticky top-0 z-10 border-b border-[#F5A524]/20">
            <div className="container mx-auto flex justify-between items-center">
                <MunicipalityLogo className="h-8"/>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 space-x-reverse">
                    <NavLink href="/" icon={<Home className="w-5 h-5"/>} text="الرئيسية"/>
                    <NavLink
                        href="/chat"
                        icon={<MessageSquare className="w-5 h-5"/>}
                        text="شكوى جديدة"/>
                </div>

                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger className="md:hidden p-2">
                        <Menu className="w-6 h-6"/>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-[#0A1A2F] border-[#F5A524]/20 p-0">
                        <div className="flex flex-col space-y-4 p-4">
                            <MobileNavLink href="/" icon={<Home className="w-5 h-5"/>} text="الرئيسية"/>
                            <MobileNavLink
                                href="/chat"
                                icon={<MessageSquare className="w-5 h-5"/>}
                                text="شكوى جديدة"/>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
        <div className="container mx-auto px-4 py-8">{children}</div>
        </body>
        </html>)
    );
}

function NavLink({
                     href,
                     icon,
                     text
                 }) {
    return (
        (<Link
            href={href}
            className="flex items-center gap-2 hover:text-[#F5A524] transition-colors text-sm">
            {icon}
            <span>{text}</span>
        </Link>)
    );
}

function MobileNavLink({
                           href,
                           icon,
                           text
                       }) {
    return (
        (<Link
            href={href}
            className="flex items-center gap-3 hover:text-[#F5A524] transition-colors p-2 text-lg">
            {icon}
            <span>{text}</span>
        </Link>)
    );
}

