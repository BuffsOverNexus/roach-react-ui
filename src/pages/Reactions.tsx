
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { PageLayout, PageControls, EmptyState } from "@/components/common";
import ReactionsHeader from "@/components/reactions/ReactionsHeader";
import ReactionsDataTable from "@/components/reactions/ReactionsDataTable";
import ReactionsDialogManager from "@/components/reactions/ReactionsDialogManager";
import { useReactions } from "@/components/reactions/useReactions";
import { useAtomValue } from "jotai";
import { guildAtom } from "@/utils/atoms";

function Reactions() {
    const { messageId } = useParams<{ messageId: string }>();
    const navigate = useNavigate();
    const currentGuild = useAtomValue(guildAtom);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [rows, setRows] = useState(5);

    const messageIdNum = messageId ? parseInt(messageId) : null;
    const guildId = currentGuild?.id ?? null;

    // If we don't have guild context, we can't load roles/emotes
    if (!currentGuild) {
        console.warn("Reactions page: No guild context available. User may have navigated directly to this page.");
    }

    const {
        reactions,
        roles,
        emotes,
        loading,
        rolesLoading,
        emotesLoading,
        createReaction,
        deleteReaction,
        toast
    } = useReactions(guildId, messageIdNum);

    const handleCreate = () => {
        setShowCreateDialog(true);
    };

    const handlePublish = async () => {
        // TODO: Implement publish functionality
        console.log("Publishing all reaction roles...");
        // This would typically call an API to publish all reactions to Discord
    };

    const handleCreateSubmit = async (emoteId: string, roleId: string) => {
        await createReaction(emoteId, roleId);
    };

    const handleDelete = async (reactionId: number) => {
        await deleteReaction(reactionId);
    };

    const breadcrumbItems = [
      { 
        label: "Categories", 
        command: () => navigate(`/messages/${currentGuild?.id}`)
      },
      { label: "Reaction Roles" },
    ];

    // Show error if no guild context
    if (!currentGuild) {
        return (
            <PageLayout breadcrumbItems={breadcrumbItems}>
                <EmptyState
                    message="No guild context available. Please navigate to this page through the Messages page."
                    severity="warn"
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout breadcrumbItems={breadcrumbItems}>
            <ReactionsHeader
                loading={loading}
                reactionsCount={reactions.length}
                onCreate={handleCreate}
                onPublish={handlePublish}
            />

            <PageControls
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                searchPlaceholder="Search role names..."
                rows={rows}
                onRowsChange={setRows}
                disabled={loading}
            />

            <ReactionsDataTable
                reactions={reactions}
                emotes={emotes}
                loading={loading}
                rolesLoading={rolesLoading}
                emotesLoading={emotesLoading}
                rows={rows}
                searchValue={searchValue}
                onDelete={handleDelete}
            />

            <ReactionsDialogManager
                showCreateDialog={showCreateDialog}
                onHide={() => setShowCreateDialog(false)}
                onSubmit={handleCreateSubmit}
                roles={roles}
                emotes={emotes}
                loading={rolesLoading || emotesLoading}
            />

            <Toast ref={toast} />
            <ConfirmDialog />
        </PageLayout>
    );
}

export default Reactions;