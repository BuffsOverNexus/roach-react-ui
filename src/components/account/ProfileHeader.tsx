import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { getDiscordAvatarUrl } from "@/utils/common";
import type { DiscordUser } from "@/utils/discord";
import type { User } from "@/types/models";

interface ProfileHeaderProps {
    discordUser: DiscordUser;
    dbUser: User | null;
}

function ProfileHeader({ discordUser, dbUser }: ProfileHeaderProps) {
    return (
        <Card className="p-6">
            <div className="flex flex-col items-center justify-center gap-6 mb-6">
                <img
                    src={getDiscordAvatarUrl(discordUser.id, discordUser.avatar, 96)}
                    alt={`${discordUser.username}'s avatar`}
                    className="w-24 h-24 rounded-full border-4 border-primary"
                />
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-1 text-center">
                        {discordUser.username}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        {dbUser?.admin && (
                            <Tag severity="danger" value="Administrator" />
                        )}
                        {discordUser.verified && (
                            <Tag severity="success" value="Verified" />
                        )}
                        {discordUser.premium_type && discordUser.premium_type > 0 && (
                            <Tag severity="info" value="Discord Nitro" />
                        )}
                    </div>
                </div>
            </div>

            <Divider />
        </Card>
    );
}

export default ProfileHeader;