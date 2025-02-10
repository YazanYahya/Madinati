"use client"

import {useRef, useState} from "react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Camera, MapPin, Mic, Send, StopCircle} from "lucide-react"
import {motion} from "framer-motion"
import cn from "classnames"
import {Textarea} from "@/components/ui/textarea";

export default function InputArea({onSendMessage}) {
    const [input, setInput] = useState("")
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const recordingInterval = useRef(null)

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input)
            setInput("")
        }
    }

    const handleVoiceInput = async () => {
        if (isRecording) {
            setIsRecording(false)
            clearInterval(recordingInterval.current)
            onSendMessage(`تم تسجيل رسالة صوتية (${recordingTime} ثانية)`)
            setRecordingTime(0)
        } else {
            setIsRecording(true)
            recordingInterval.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1)
            }, 1000)
        }
    }

    const handleAttachment = async (e) => {
        const file = e.target.files[0]
        if (file) {
            onSendMessage(`تم إرفاق ملف: ${file.name}`)
        }
    }

    const handleLocationRequest = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords
                onSendMessage(`موقعي الحالي: ${latitude}, ${longitude}`)
            }, (error) => {
                console.error("Error getting location:", error)
                onSendMessage("عذرًا، لم نتمكن من تحديد موقعك. يرجى إدخال الموقع يدويًا.")
            })
        }
    }

    return (
        (<div className="p-4 border-t border-[#F5A524]/20 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
                <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleVoiceInput}
                            className={cn(
                                "border-[#F5A524]/20 hover:bg-[#F5A524]/10",
                                isRecording && "animate-pulse bg-red-500"
                            )}>
                            {isRecording ? <StopCircle className="h-4 w-4"/> : <Mic className="h-4 w-4"/>}
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                        <label htmlFor="file-upload">
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-[#F5A524]/20 hover:bg-[#F5A524]/10"
                                as="span">
                                <Camera className="h-4 w-4"/>
                            </Button>
                        </label>
                    </motion.div>
                    <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleLocationRequest}
                            className="border-[#F5A524]/20 hover:bg-[#F5A524]/10">
                            <MapPin className="h-4 w-4"/>
                        </Button>
                    </motion.div>
                </div>
                <Input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleAttachment}
                    accept="image/*,video/*"/>
                <div className="flex-1 flex gap-2 w-full items-center">
                    <Textarea
                        placeholder="اكتب شكواك هنا..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        className="bg-[#1A2A3F] text-white border-[#F5A524]/20 focus:ring-[#F5A524]/50 placeholder-gray-400 text-right resize-none overflow-hidden min-h-[40px] px-3 py-2 rounded-md"
                    />

                    <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                        <Button
                            onClick={handleSend}
                            className="bg-[#F5A524] hover:bg-[#E09410] text-[#0A1A2F]">
                            <Send className="h-4 w-4"/>
                        </Button>
                    </motion.div>
                </div>
            </div>
            {isRecording && <div className="text-center text-red-500">جاري التسجيل... {recordingTime} ثانية</div>}
        </div>)
    );
}

