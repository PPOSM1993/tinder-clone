"use client";

import { UserProfile } from "@/app/profile/page";
import { useAuth } from "@/context/auth-context";
import { getUserMatches } from "@/lib/actions/matches";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatHeader from "@/components/ChatHeader";
import StreamChatInterface from "@/components/StreamChatInterface";


export default function ChatConversationPage() {


    const [otherUser, setOtherUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const params = useParams();
    const { user } = useAuth();
    const userId = params.userId as string;

    const chatInterfaceRef = useRef<{ handleVideoCall: () => void } | null>(null);

    useEffect(() => {
        async function loadUserData() {
            try {
                const userMatches = await getUserMatches();
                const matchedUser = userMatches.find((match) => match.id === userId);

                if (matchedUser) {
                    setOtherUser(matchedUser);
                } else {
                    router.push("/chat");
                }
                console.log(userMatches);
            } catch (error) {
                console.error(error);
                router.push("/chat");
            } finally {
                setLoading(false);
            }
        }

        if (user) {
            loadUserData();
        }
        loadUserData();
    }, [userId, router, user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Loading your matches...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="h-screen bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-4xl mx-auto h-full flex flex-col">
                    <ChatHeader user={otherUser}           onVideoCall={() => {
            chatInterfaceRef.current?.handleVideoCall();
          }} />
                    <div className="flex-1 min-h-0">
                        <StreamChatInterface />
                    </div>
                </div>
            </div>
        </>
    )
}