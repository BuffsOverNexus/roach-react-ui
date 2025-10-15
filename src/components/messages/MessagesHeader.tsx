import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import type { Guild } from "@/types/models";

interface MessagesHeaderProps {
    loading: boolean;
    discord: Guild | null;
    messagesCount: number;
    onChannelEdit: () => void;
    onPublishAll: () => void;
    onCreate: () => void;
}

function MessagesHeader({ 
    loading, 
    discord, 
    messagesCount, 
    onChannelEdit, 
    onPublishAll, 
    onCreate 
}: MessagesHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Categories</h1>
                {loading ? (
                    <Skeleton height="2.5rem" width="8rem" />
                ) : discord ? (
                    <Button
                        label={`#${discord.channelName}`}
                        icon="pi pi-pencil"
                        severity="secondary"
                        onClick={onChannelEdit}
                        tooltip="Change the channel Roach publishes to"
                        tooltipOptions={{ position: 'top' }}
                    />
                ) : null}
            </div>
            <div className="flex gap-2">
                <Button
                    label="Publish All"
                    icon="pi pi-discord"
                    severity="info"
                    onClick={onPublishAll}
                    disabled={loading || messagesCount === 0}
                    tooltip="Regenerate all messages"
                />
                <Button
                    label="Create"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={onCreate}
                    disabled={loading}
                    tooltip="Create new message"
                />
            </div>
        </div>
    );
}

export default MessagesHeader;