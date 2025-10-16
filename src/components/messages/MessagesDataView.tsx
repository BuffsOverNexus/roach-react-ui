import { DataView } from "primereact/dataview";
import MessageItem from "./MessageItem";
import MessageItemSkeleton from "./MessageItemSkeleton";
import type { Message } from "@/types/models";

interface MessagesDataViewProps {
    messages: Message[];
    loading: boolean;
    rows: number;
    first: number;
    onPage: (e: any) => void;
    onEdit: (message: Message) => void;
    onPublish: (messageId: string) => void;
    onDelete: (messageId: string) => void;
}

function MessagesDataView({
    messages,
    loading,
    rows,
    first,
    onPage,
    onEdit,
    onPublish,
    onDelete
}: MessagesDataViewProps) {
    const messageItemTemplate = (message: any) => {
        if (loading) {
            return <MessageItemSkeleton />;
        }
        
        return (
            <MessageItem
                message={message}
                loading={loading}
                onEdit={onEdit}
                onPublish={onPublish}
                onDelete={onDelete}
            />
        );
    };

    return (
        <DataView
            value={loading ? [1, 2, 3, 4, 5] : messages}
            itemTemplate={messageItemTemplate}
            layout="list"
            emptyMessage="No messages found"
            loading={false}
            className="mt-4"
            paginator={!loading}
            rows={rows}
            first={first}
            onPage={onPage}
        />
    );
}

export default MessagesDataView;