"use client";

import { UserProfile } from "@/app/profile/page";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useState } from "react";


interface Message {
    id: string;
    text: string;
    sender: "me" | "other";
    timestamp: Date;
    user_id: string;
}


export default function StreamChatInterface(
    {
        otherUser,
        ref,
    }: {
        otherUser: UserProfile;
        ref: RefObject<{ handleVideoCall: () => void } | null>;
    }
) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);


    const router = useRouter();

    function scrollToBottom() {
        //messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        //setShowScrollButton(false);
    }

    useEffect(() => {

        async function initializeChat() {
            try {
                
            } catch (error) {
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        if (otherUser) {
            initializeChat();
        }

    }, [otherUser])

    return (
        <>
            <div className="h-full flex flex-col bg-white dark:bg-gray-900">
                xD
            </div>
        </>
    )
}