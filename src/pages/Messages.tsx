import { useParams } from "react-router-dom";
import { useState } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { PageLayout, PageControls } from "@/components/common";
import MessagesHeader from "@/components/messages/MessagesHeader";
import MessagesDataView from "@/components/messages/MessagesDataView";
import MessagesDialogManager from "@/components/messages/MessagesDialogManager";
import { useMessages } from "@/hooks/useMessages";

function Messages() {
    const { discordId } = useParams();
    const [searchValue, setSearchValue] = useState("");
    const {
        // State
        messages,
        discord,
        loading,
        first,
        setFirst,
        rows,
        setRows,
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

    // Filter messages based on search
    const filteredMessages = messages.filter(message =>
        message.subject.toLowerCase().includes(searchValue.toLowerCase())
    );

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

    const breadcrumbItems = [{ label: 'Categories' }];

    return (
        <PageLayout breadcrumbItems={breadcrumbItems}>
            <Toast ref={toast} />
            <ConfirmDialog />
            
            <MessagesDialogManager
                // Create dialog props
                showCreateDialog={showCreateDialog}
                newMessageSubject={newMessageSubject}
                submitting={submitting}
                touched={touched}
                onCreateHide={handleCloseCreateDialog}
                onSubjectChange={setNewMessageSubject}
                onSubjectBlur={() => setTouched(true)}
                onCreateSubmit={handleSubmitNewMessage}
                onCreateKeyDown={handleCreateKeyDown}
                
                // Edit dialog props
                showEditSubjectDialog={showEditSubjectDialog}
                editSubject={editSubject}
                updatingSubject={updatingSubject}
                editSubjectTouched={editSubjectTouched}
                onEditHide={handleCloseEditSubjectDialog}
                onEditSubjectChange={setEditSubject}
                onEditSubjectBlur={() => setEditSubjectTouched(true)}
                onEditSave={handleUpdateSubject}
                onEditKeyDown={handleEditKeyDown}
                
                // Channel dialog props
                showChannelDialog={showChannelDialog}
                channels={channels}
                selectedChannelId={selectedChannelId}
                updatingChannel={updatingChannel}
                onChannelHide={handleCloseChannelDialog}
                onChannelChange={setSelectedChannelId}
                onChannelUpdate={handleUpdateChannel}
            />
            
            <MessagesHeader
                loading={loading}
                discord={discord}
                messagesCount={messages.length}
                onChannelEdit={handleOpenChannelDialog}
                onPublishAll={handleRegenerateAll}
                onCreate={handleCreateMessage}
            />

            <PageControls
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                searchPlaceholder="Search message subjects..."
                rows={rows}
                onRowsChange={setRows}
                disabled={loading}
            />

            <MessagesDataView
                messages={filteredMessages}
                loading={loading}
                rows={rows}
                first={first}
                onPage={(e) => setFirst(e.first)}
                onEdit={handleOpenEditSubjectDialog}
                onPublish={handleRegenerateMessage}
                onDelete={handleDeleteMessage}
            />
        </PageLayout>
    );
}

export default Messages;