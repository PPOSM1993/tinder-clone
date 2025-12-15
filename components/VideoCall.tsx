import { useState } from "react";
import { getStreamVideoToken } from "@/lib/actions/stream";


interface VideoCallProps {
    callId: string;
    onCallEnd: () => void;
    isIncoming?: boolean;
}

export default function VideoCall({
    callId,
    onCallEnd,
    isIncoming = false,
}: VideoCallProps) {

    const [client, setClient] = useState<StreamVideoClient | null>(null);
    const [call, setCall] = useState<Call | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasJoined, setHasJoined] = useState(false);

}