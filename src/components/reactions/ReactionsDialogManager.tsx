import CreateReactionDialog from "./CreateReactionDialog";
import type { DiscordRole, DiscordEmote } from "@/types/api";
import type { Reaction } from "@/types/models";

interface ReactionsDialogManagerProps {
    showCreateDialog: boolean;
    onHide: () => void;
    onSubmit: (emoteId: string, roleId: string) => Promise<void>;
    roles: DiscordRole[];
    emotes: DiscordEmote[];
    existingReaction?: Reaction | null;
    loading: boolean;
}

function ReactionsDialogManager({
    showCreateDialog,
    onHide,
    onSubmit,
    roles,
    emotes,
    existingReaction,
    loading
}: ReactionsDialogManagerProps) {
    return (
        <CreateReactionDialog
            visible={showCreateDialog}
            onHide={onHide}
            onSubmit={onSubmit}
            roles={roles}
            emotes={emotes}
            existingReaction={existingReaction}
            loading={loading}
        />
    );
}

export default ReactionsDialogManager;