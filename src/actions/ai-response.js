"use server"

import OpenAI from "openai"

let openai = null

try {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
} catch (error) {
    console.error("Error initializing OpenAI client:", error)
}

export async function handleAIResponse(userMessage) {
    if (!openai) {
        return "I'm sorry, but I'm not able to process your request at the moment due to a configuration issue. Please contact the system administrator."
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful AI assistant for a municipal complaint system. Provide concise and relevant responses.",
                },
                {role: "user", content: userMessage},
            ],
        })

        return completion.choices[0].message.content
    } catch (error) {
        console.error("Error in AI response:", error)
        return "I'm sorry, I couldn't process your request at the moment. Please try again later."
    }
}

