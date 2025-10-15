import { useParams } from "react-router-dom";
import { DataView } from "primereact/dataview";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import MessagesHeader from "@/components/messages/MessagesHeader";
import MessageItem from "@/components/messages/MessageItem";
import MessageItemSkeleton from "@/components/messages/MessageItemSkeleton";
import CreateMessageDialog from "@/components/messages/CreateMessageDialog";
import EditSubjectDialog from "@/components/messages/EditSubjectDialog";
import ChannelSelectionDialog from "@/components/messages/ChannelSelectionDialog";
import { useMessages } from "@/hooks/useMessages";

function Messages() {
    const { discordId } = useParams();
    const {
        // State
        messages,
        discord,
        loading,
        first,
        setFirst,
        rows,
        toast,
        
        // Create dialog
        showCreateDialog,
        newMessageSubject,
        setNewMessageSubject,
        submitting,
        touched,
        setTouched,
        handleCreateMessage,
        handleSubmitNewMessage,
        handleCloseCreateDialog,
        
        // Edit subject dialog
        showEditSubjectDialog,
        editSubject,
        setEditSubject,
        updatingSubject,
        editSubjectTouched,
        setEditSubjectTouched,
        handleOpenEditSubjectDialog,
        handleUpdateSubject,
        handleCloseEditSubjectDialog,
        
        // Channel dialog
        showChannelDialog,
        channels,
        selectedChannelId,
        setSelectedChannelId,
        updatingChannel,
        handleOpenChannelDialog,
        handleUpdateChannel,
        handleCloseChannelDialog,
        
        // Message operations
        handleRegenerateMessage,
        handleDeleteMessage,
        handleRegenerateAll,
    } = useMessages(discordId);

    const messageItemTemplate = (message: any) => {
        if (loading) {
            return <MessageItemSkeleton />;
        }
        
        return (
            <MessageItem
                message={message}
                loading={loading}
                onEdit={handleOpenEditSubjectDialog}
                onPublish={handleRegenerateMessage}
                onDelete={handleDeleteMessage}
            />
        );
    };

    const handleCreateKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !submitting && newMessageSubject.trim().length >= 10) {
            handleSubmitNewMessage();
        }
    };

    const handleEditKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !updatingSubject && editSubject.trim().length >= 10) {
            handleUpdateSubject();
        }
    };

    return (
        <div className="pt-4">
            {/* Breadcrumb Navigation */}
            <PageBreadcrumb items={[{ label: 'Categories' }]} />
            
            <Toast ref={toast} />
            <ConfirmDialog />
            
            {/* Create Message Dialog */}
            <CreateMessageDialog
                visible={showCreateDialog}
                subject={newMessageSubject}
                submitting={submitting}
                touched={touched}
                onHide={handleCloseCreateDialog}
                onSubjectChange={setNewMessageSubject}
                onSubjectBlur={() => setTouched(true)}
                onSubmit={handleSubmitNewMessage}
                onKeyDown={handleCreateKeyDown}
            />
            
            {/* Edit Subject Dialog */}
            <EditSubjectDialog
                visible={showEditSubjectDialog}
                subject={editSubject}
                updating={updatingSubject}
                touched={editSubjectTouched}
                onHide={handleCloseEditSubjectDialog}
                onSubjectChange={setEditSubject}
                onSubjectBlur={() => setEditSubjectTouched(true)}
                onSave={handleUpdateSubject}
                onKeyDown={handleEditKeyDown}
            />
            
            {/* Channel Selection Dialog */}
            <ChannelSelectionDialog
                visible={showChannelDialog}
                channels={channels}
                selectedChannelId={selectedChannelId}
                updating={updatingChannel}
                onHide={handleCloseChannelDialog}
                onChannelChange={setSelectedChannelId}
                onUpdate={handleUpdateChannel}
            />
            
            {/* Header */}
            <MessagesHeader
                loading={loading}
                discord={discord}
                messagesCount={messages.length}
                onChannelEdit={handleOpenChannelDialog}
                onPublishAll={handleRegenerateAll}
                onCreate={handleCreateMessage}
            />

            {/* Messages DataView */}
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
                onPage={(e) => setFirst(e.first)}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </div>
    );
}

export default Messages;