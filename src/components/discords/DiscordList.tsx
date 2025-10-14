import type { DiscordGuild } from "@/types/api";
import DiscordItem from "./DiscordItem";
import DiscordItemSkeleton from "./DiscordItemSkeleton";

interface DiscordListProps {
    discords: DiscordGuild[];
    loading: boolean;
}

function DiscordList({ discords, loading }: DiscordListProps) {
    if (loading) {
        return (
            <>
                {Array.from({ length: 5 }, (_, index) => (
                    <div key={`skeleton-${index}`}>
                        <DiscordItemSkeleton />
                    </div>
                ))}
            </>
        );
    }

    if (!discords || discords.length === 0) {
        return <div>No Discords available.</div>;
    }

    return (
        <>
            {discords.map(discord => (
                <DiscordItem key={discord.id} discord={discord} />
            ))}
        </>
    );
}

export default DiscordList;