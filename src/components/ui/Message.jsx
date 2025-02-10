import {Avatar} from "@/components/ui/avatar"
import {cn} from "@/lib/utils"
import {Building2, User2} from "lucide-react"

export default function Message({content, type}) {
    const isUser = type === "user"
    const isTyping = type === "typing"

    return (
        (<div className={cn("flex", isUser ? "justify-start" : "justify-end")}>
            <div
                className={cn("flex items-end gap-2", isUser ? "flex-row" : "flex-row-reverse")}>
                <Avatar
                    className={cn(
                        "w-8 h-8",
                        isUser ? "bg-[#F5A524]" : "bg-[#1A2A3F]",
                        "flex items-center justify-center"
                    )}>
                    {isUser ? <User2 className="w-5 h-5 text-[#0A1A2F]"/> :
                        <Building2 className="w-5 h-5 text-[#F5A524]"/>}
                </Avatar>
                <div
                    className={cn(
                        "max-w-[75%] p-3 rounded-lg shadow-lg",
                        isUser ? "bg-[#F5A524] text-[#0A1A2F]" : "bg-[#1A2A3F] text-white border border-[#F5A524]/20"
                    )}>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs opacity-75">{isUser ? "المواطن" : "البلدية"}</span>
                        {isTyping ? (
                            <div className="flex space-x-1 rtl:space-x-reverse">
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce"/>
                                <div
                                    className="w-2 h-2 bg-current rounded-full animate-bounce"
                                    style={{animationDelay: "0.2s"}}/>
                                <div
                                    className="w-2 h-2 bg-current rounded-full animate-bounce"
                                    style={{animationDelay: "0.4s"}}/>
                            </div>
                        ) : (
                            <p className="text-sm whitespace-pre-wrap">{content}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>)
    );
}

