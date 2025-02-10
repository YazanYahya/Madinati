"use client";

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {motion} from "framer-motion"
import {MessageSquare} from "lucide-react"
import Image from "next/image"

export default function Home() {
    return (
        (<main
            className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center p-4 md:p-24 text-center">
            <motion.div
                className="mb-12"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}>
                <Image
                    src="/logo.png"
                    alt="Madinati Logo"
                    width={500}
                    height={400}
                    priority
                    className="w-36 md:w-48 h-auto"/>
            </motion.div>
            <motion.h1
                className="text-3xl md:text-5xl font-bold mb-8 text-[#F5A524]"
                initial={{opacity: 0, y: -50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}>
                نظام الشكاوى البلدية الذكي
            </motion.h1>
            <motion.p
                className="text-lg md:text-xl mb-12 max-w-2xl text-gray-300"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.2, duration: 0.5}}>
                نظام حديث وسهل الاستخدام لتقديم ومتابعة الشكاوى البلدية. مدعوم بالذكاء الاصطناعي لتجربة أكثر كفاءة
                وفعالية.
            </motion.p>
            <motion.div
                className="flex flex-col md:flex-row gap-4"
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.4, duration: 0.5}}>
                <Link href="/chat">
                    <Button
                        className="bg-[#F5A524] hover:bg-[#E09410] text-[#0A1A2F] w-full md:w-auto">
                        <MessageSquare className="w-5 h-5 ml-2"/>
                        تقديم شكوى جديدة
                    </Button>
                </Link>
            </motion.div>
        </main>)
    );
}

