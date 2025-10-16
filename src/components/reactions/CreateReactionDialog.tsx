import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import type { DiscordRole, DiscordEmote } from "@/types/api";
import type { Reaction } from "@/types/models";

interface CreateReactionDialogProps {
    visible: boolean;
    onHide: () => void;
    onSubmit: (emoteId: string, roleId: string) => Promise<void>;
    roles: DiscordRole[];
    emotes: DiscordEmote[];
    existingReaction?: Reaction | null;
    loading: boolean;
}

function CreateReactionDialog({
    visible,
    onHide,
    onSubmit,
    roles,
    emotes,
    existingReaction,
    loading
}: CreateReactionDialogProps) {
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedEmote, setSelectedEmote] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (visible) {
            setSelectedRole(existingReaction?.roleId || "");
            setSelectedEmote(existingReaction?.emoteId || "");
        }
    }, [visible, existingReaction]);

    const handleSubmit = async () => {
        if (!selectedRole || !selectedEmote) {
            return;
        }

        try {
            setIsSubmitting(true);
            await onSubmit(selectedEmote, selectedRole);
            onHide();
        } catch (error) {
            console.error("Failed to create reaction:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const roleOptions = roles.map(role => ({
        label: role.name,
        value: role.id
    }));

    const emoteOptions = emotes.map(emote => ({
        label: emote.name,
        value: emote.id,
        image: emote.image
    }));

    const emoteItemTemplate = (option: any) => {
        if (!option) return null;
        
        return (
            <div className="flex items-center gap-2">
                <img 
                    src={option.image}
                    alt={option.label}
                    className="w-6 h-6 rounded"
                />
                <span>{option.label}</span>
            </div>
        );
    };

    const selectedEmoteTemplate = (option: any) => {
        if (!option) return null;
        const emote = emotes.find(e => e.id === option.value);
        if (!emote) return option.label;
        
        return (
            <div className="flex items-center gap-2">
                <img 
                    src={emote.image}
                    alt={emote.name}
                    className="w-6 h-6 rounded"
                />
                <span>{emote.name}</span>
            </div>
        );
    };

    const isValid = selectedRole && selectedEmote;

    return (
        <Dialog
            header={existingReaction ? "Edit Reaction Role" : "Add Reaction Role"}
            visible={visible}
            style={{ width: '32rem' }}
            onHide={onHide}
            modal
        >
            <div className="space-y-4">
                <div>
                    <label htmlFor="emote" className="block text-sm font-medium mb-2">
                        Emote
                    </label>
                    <Dropdown
                        id="emote"
                        value={selectedEmote}
                        onChange={(e) => setSelectedEmote(e.value)}
                        options={emoteOptions}
                        placeholder="Select an emote"
                        className="w-full"
                        valueTemplate={selectedEmoteTemplate}
                        itemTemplate={emoteItemTemplate}
                        disabled={loading || isSubmitting}
                        filter
                        filterBy="label"
                        scrollHeight="200px"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-2">
                        Role
                    </label>
                    <Dropdown
                        id="role"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.value)}
                        options={roleOptions}
                        placeholder="Select a role"
                        className="w-full"
                        disabled={loading || isSubmitting}
                        filter
                        filterBy="label"
                        scrollHeight="200px"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button
                        label="Cancel"
                        icon="pi pi-times"
                        onClick={onHide}
                        className="p-button-secondary"
                        disabled={isSubmitting}
                    />
                    <Button
                        label={existingReaction ? "Update" : "Create"}
                        icon="pi pi-check"
                        onClick={handleSubmit}
                        disabled={!isValid || isSubmitting}
                        loading={isSubmitting}
                        className="p-button-primary"
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default CreateReactionDialog;