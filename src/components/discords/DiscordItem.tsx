import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import type { DiscordGuild } from "@/types/api";
import { useNavigate } from "react-router-dom";

interface DiscordItemProps {
    discord: DiscordGuild;
}

function DiscordItem({ discord }: DiscordItemProps) {
    const router = useNavigate();

    function handleManageClick(discord: DiscordGuild) {
        // Navigate to the manage page for the specific Discord guild
        router(`/messages/${discord.id}`);
    }
    function handleSetupClick(discord: DiscordGuild) {
        // Navigate to the setup page for the specific Discord guild
        router(`/discords/integrate/${discord.id}`);
    }
    return (
        <div
            key={discord.id}
            className="flex items-center justify-between p-4"
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
                        onClick={() => handleManageClick(discord)}
                    />
                ) : (
                    <Button
                        label="Setup"
                        icon="pi pi-plus-circle"
                        severity="success"
                        onClick={() => handleSetupClick(discord)}
                    />
                )}
            </div>
        </div>
    );
}

export default DiscordItem;