import CreateMessageDialog from "./CreateMessageDialog";
import EditSubjectDialog from "./EditSubjectDialog";
import ChannelSelectionDialog from "./ChannelSelectionDialog";

interface MessagesDialogManagerProps {
    // Create dialog props
    showCreateDialog: boolean;
    newMessageSubject: string;
    submitting: boolean;
    touched: boolean;
    onCreateHide: () => void;
    onSubjectChange: (value: string) => void;
    onSubjectBlur: () => void;
    onCreateSubmit: () => void;
    onCreateKeyDown: (e: React.KeyboardEvent) => void;

    // Edit dialog props
    showEditSubjectDialog: boolean;
    editSubject: string;
    updatingSubject: boolean;
    editSubjectTouched: boolean;
    onEditHide: () => void;
    onEditSubjectChange: (value: string) => void;
    onEditSubjectBlur: () => void;
    onEditSave: () => void;
    onEditKeyDown: (e: React.KeyboardEvent) => void;

    // Channel dialog props
    showChannelDialog: boolean;
    channels: any[];
    selectedChannelId: string;
    updatingChannel: boolean;
    onChannelHide: () => void;
    onChannelChange: (channelId: string) => void;
    onChannelUpdate: () => void;
}

function MessagesDialogManager({
    // Create dialog
    showCreateDialog,
    newMessageSubject,
    submitting,
    touched,
    onCreateHide,
    onSubjectChange,
    onSubjectBlur,
    onCreateSubmit,
    onCreateKeyDown,

    // Edit dialog
    showEditSubjectDialog,
    editSubject,
    updatingSubject,
    editSubjectTouched,
    onEditHide,
    onEditSubjectChange,
    onEditSubjectBlur,
    onEditSave,
    onEditKeyDown,

    // Channel dialog
    showChannelDialog,
    channels,
    selectedChannelId,
    updatingChannel,
    onChannelHide,
    onChannelChange,
    onChannelUpdate
}: MessagesDialogManagerProps) {
    return (
        <>
            <CreateMessageDialog
                visible={showCreateDialog}
                subject={newMessageSubject}
                submitting={submitting}
                touched={touched}
                onHide={onCreateHide}
                onSubjectChange={onSubjectChange}
                onSubjectBlur={onSubjectBlur}
                onSubmit={onCreateSubmit}
                onKeyDown={onCreateKeyDown}
            />
            
            <EditSubjectDialog
                visible={showEditSubjectDialog}
                subject={editSubject}
                updating={updatingSubject}
                touched={editSubjectTouched}
                onHide={onEditHide}
                onSubjectChange={onEditSubjectChange}
                onSubjectBlur={onEditSubjectBlur}
                onSave={onEditSave}
                onKeyDown={onEditKeyDown}
            />
            
            <ChannelSelectionDialog
                visible={showChannelDialog}
                channels={channels}
                selectedChannelId={selectedChannelId}
                updating={updatingChannel}
                onHide={onChannelHide}
                onChannelChange={onChannelChange}
                onUpdate={onChannelUpdate}
            />
        </>
    );
}

export default MessagesDialogManager;