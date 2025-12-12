"use client";

import { UserProfile } from "@/app/profile/page";
import { RefObject, useEffect, useState } from "react";


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

    useEffect(() => {

        async function initializeChat() {
            try {

            } catch (error) {
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }

        if(otherUser) {
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