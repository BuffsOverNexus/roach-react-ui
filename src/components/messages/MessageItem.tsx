import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import type { Message } from "@/types/models";

interface MessageItemProps {
    message: Message;
    loading: boolean;
    onEdit: (message: Message) => void;
    onPublish: (messageId: string) => void;
    onDelete: (messageId: string) => void;
}

function MessageItem({ message, loading, onEdit, onPublish, onDelete }: MessageItemProps) {
    const router = useNavigate();

    return (
        <Card>
            <div className="flex justify-between items-center gap-3">
                {/* Message content */}
                <div className="px-2 py-1">
                    <Button
                        label={message.subject}
                        icon="pi pi-pencil"
                        iconPos="right"
                        text
                        severity="secondary"
                        className="text-lg font-semibold p-0 h-auto text-left hover:bg-gray-100 transition-all duration-200 rounded-md px-2 py-1 -mx-2 -my-1"
                        onClick={() => onEdit(message)}
                        tooltip="Click to edit subject"
                        tooltipOptions={{ position: 'top' }}
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button
                        label="Reactions"
                        icon="pi pi-users"
                        onClick={() => router(`/reactions/${message.id}`)}
                        className="p-button-primary"
                        size="small"
                    />
                    <Button
                        label="Publish"
                        icon="pi pi-discord"
                        severity="info"
                        onClick={() => onPublish(message.id.toString())}
                        disabled={loading}
                        size="small"
                    />
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        severity="danger"
                        onClick={() => onDelete(message.id.toString())}
                        disabled={loading}
                        size="small"
                        tooltip="Delete message"
                    />
                </div>
            </div>
        </Card>
    );
}

export default MessageItem;