"use client";

import { UserProfile } from "@/app/profile/page";
import { RefObject, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrGetChannel, getStreamUserToken, createVideoCall, getStreamVideoToken } from "@/lib/actions/stream";
import { StreamChat, Channel, Event } from "stream-chat";


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

    const [client, setClient] = useState<StreamChat | null>(null);
    const [channel, setChannel] = useState<Channel | null>(null);

    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

    const [videoCallId, setVideoCallId] = useState<string>("");
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [isCallInitiator, setIsCallInitiator] = useState(false);

    const [incomingCallId, setIncomingCallId] = useState<string>("");
    const [callerName, setCallerName] = useState<string>("");
    const [showIncomingCall, setIncomingCall] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    useEffect(() => {

        async function initializeChat() {
            try {
                setError(null);

                const { token, userId, userName, userImage } =
                    await getStreamUserToken();
                setCurrentUserId(userId!);

                const chatClient = StreamChat.getInstance(
                    process.env.NEXT_PUBLIC_STREAM_API_KEY!
                );

                await chatClient.connectUser(
                    {
                        id: userId!,
                        name: userName,
                        image: userImage,
                    },
                    token
                );

                const { channelType, channelId } = await createOrGetChannel(
                    otherUser.id
                );

                // Get the channel
                const chatChannel = chatClient.channel(channelType!, channelId);
                await chatChannel.watch();

                // Load existing messages
                const state = await chatChannel.query({ messages: { limit: 50 } });


                // Convert stream messages to our format
                const convertedMessages: Message[] = state.messages.map((msg) => ({
                    id: msg.id,
                    text: msg.text || "",
                    sender: msg.user?.id === userId ? "me" : "other",
                    timestamp: new Date(msg.created_at || new Date()),
                    user_id: msg.user?.id || "",
                }));

                setMessages(convertedMessages);

                chatChannel.on("message.new", async (event) => {
                    if (event.message) {
                        if (event.message.text?.includes(`📹 Video call invitation`)) {
                            const customData = event.message as any;

                            if (customData.caller_id !== userId) {
                                setIncomingCallId(customData.call_id);
                                setCallerName(customData.caller_name || "Someone");
                                setIncomingCall(true);
                            }
                            return;
                        }

                        if (event.message.user?.id !== userId) {
                            const newMsg: Message = {
                                id: event.message.id,
                                text: event.message.text || "",
                                sender: "other",
                                timestamp: new Date(event.message.created_at || new Date()),
                                user_id: event.message.user?.id || "",
                            };

                            setMessages((prev) => {
                                const messageExists = prev.some((msg) => msg.id === newMsg.id);
                                if (!messageExists) {
                                    return [...prev, newMsg];
                                }

                                return prev;
                            });
                        }
                    }
                });

                chatChannel.on("typing.start", (event: Event) => {
                    if (event.user?.id !== userId) {
                        setIsTyping(true);
                    }
                });

                chatChannel.on("typing.stop", (event: Event) => {
                    if (event.user?.id !== userId) {
                        setIsTyping(false);
                    }
                });

                setClient(chatClient);
                setChannel(chatChannel);


            } catch (error) {
                setLoading(false);
                router.push("/chat");
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