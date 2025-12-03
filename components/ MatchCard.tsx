import { UserProfile } from "@/app/profile/page";
import Image from "next/image";
import { calculateAge } from "../lib/helpers/ calculate-age";

export default function MatchCard({ user }: { user: UserProfile }) {

    if (!user) return null; // o un loader

    return (
        <div className="relative w-full max-w-sm mx-auto">
            <div className="card-swipe aspect-[3/4] overflow-hidden">
                <div className="relative w-full h-full">
                    <img
                        src={user.avatar_url ?? "/default-avatar.png"}
                        alt={user.full_name ?? "Unknown user"}
                        className={`object-cover transition-opacity duration-300`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">
                                    {user.full_name}, {calculateAge(user.birthdate)}
                                </h2>
                                <p className="text-sm opacity-90 mb-2">@{user.username}</p>
                                <p className="text-sm leading-relaxed py-6">{user.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}