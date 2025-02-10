"use client"

import {useEffect, useRef, useState} from "react"
import {Card} from "@/components/ui/card"
import Message from "./Message"
import InputArea from "./InputArea"
import {AnimatePresence, motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import {AlertTriangle, GlassWaterIcon as Water, Lightbulb, TrafficCone, Trash2, Truck} from "lucide-react"
import {mockAIResponses, predefinedMessages} from "@/utils/mockData";

const icons = [
    <AlertTriangle key={0} className="w-4 h-4"/>,
    <Lightbulb key={1} className="w-4 h-4"/>,
    <Trash2 key={2} className="w-4 h-4"/>,
    <Water key={3} className="w-4 h-4"/>,
    <TrafficCone key={4} className="w-4 h-4"/>,
    <Truck key={5} className="w-4 h-4"/>,
]

export default function Chat() {
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [showPredefined, setShowPredefined] = useState(true)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(scrollToBottom, [])

    const addMessage = async (content, type = "user") => {
        const newMessage = {id: Date.now(), content, type}
        setMessages((prev) => [...prev, newMessage])

        if (type === "user") {
            setIsTyping(true)
            setShowPredefined(false)
            setTimeout(() => {
                const aiResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]
                setIsTyping(false)
                addMessage(aiResponse, "ai")
            }, 1500)
        }
    }

    return (
        (<Card
            className="w-full max-w-2xl flex flex-col bg-[#0A1A2F] border-[#F5A524]/20 shadow-lg gap-8">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {showPredefined && (
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="grid grid-cols-1 gap-2">
                        {predefinedMessages.map((msg, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="text-sm text-right flex items-center justify-start gap-2 bg-[#0A1A2F] hover:bg-[#F5A524]/10 border-[#F5A524]/20 text-white"
                                onClick={() => addMessage(msg, "user")}>
                                {msg}
                                {icons[index]}
                            </Button>
                        ))}
                    </motion.div>
                )}
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.3}}>
                            <Message {...message} />
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 0.3}}>
                            <Message content="جاري الكتابة..." type="typing"/>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef}/>
            </div>
            <InputArea onSendMessage={addMessage}/>
        </Card>)
    );
}

