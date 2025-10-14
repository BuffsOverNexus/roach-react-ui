import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import type { DiscordGuild } from "@/types/api";

interface DiscordItemProps {
    discord: DiscordGuild;
}

function DiscordItem({ discord }: DiscordItemProps) {
    return (
        <div
            key={discord.id}
            className="flex items-center justify-between p-4 border-b"
        >
            {/* Left side: Avatar and Name */}
            <div className="flex items-center gap-3">
                <Avatar image={discord.icon} size="large" shape="circle" />
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">{discord.name}</h2>
                    <Tag
                        value={discord.owner ? "Owner" : "Administrator"}
                        severity={discord.owner ? "info" : "danger"}
                        icon="pi pi-user"
                    />
                </div>
            </div>

            {/* Right side: Action Button */}
            <div>
                {discord.exists ? (
                    <Button
                        label="Manage"
                        icon="pi pi-pencil"
                    />
                ) : (
                    <Button
                        label="Setup"
                        icon="pi pi-plus-circle"
                        severity="success"
                    />
                )}
            </div>
        </div>
    );
}

export default DiscordItem;