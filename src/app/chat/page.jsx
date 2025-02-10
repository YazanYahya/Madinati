"use client";

import {motion} from "framer-motion"
import {MessageSquare} from "lucide-react"
import Chat from "../../components/ui/Chat";

export default function ChatPage() {
    return (
        <motion.main
            className="flex flex-col items-center justify-center min-h-screen p-4"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
        >
            <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#F5A524] flex items-center gap-2">
                <MessageSquare className="w-8 h-8"/>
                تقديم شكوى جديدة
            </h1>
            <Chat/>
        </motion.main>
    );
}


