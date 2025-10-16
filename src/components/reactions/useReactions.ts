import { useState, useEffect, useRef, useCallback } from "react";
import { Toast } from "primereact/toast";
import { reactionApiService } from "@/api/reactionApi";
import { roachDiscordApiService } from "@/api/roachDiscordApi";
import type { Reaction } from "@/types/models";
import type { DiscordRole, DiscordEmote } from "@/types/api";

export function useReactions(guildId: string | null, messageId: number | null) {
    const [reactions, setReactions] = useState<Reaction[]>([]);
    const [roles, setRoles] = useState<DiscordRole[]>([]);
    const [emotes, setEmotes] = useState<DiscordEmote[]>([]);
    const [loading, setLoading] = useState(false);
    const [rolesLoading, setRolesLoading] = useState(false);
    const [emotesLoading, setEmotesLoading] = useState(false);
    const toast = useRef<Toast>(null);

    // Load reactions for the specific message
    const loadReactions = useCallback(async () => {
        if (!messageId) {
            console.log("useReactions: No messageId provided");
            return;
        }

        console.log("useReactions: Loading reactions for messageId:", messageId);
        try {
            setLoading(true);
            // Try to get reactions by database message ID first
            let data = await reactionApiService().getReactionsFromRoachMessage(messageId.toString());
            console.log("useReactions: Received reactions data (by message ID):", data);
            
            // If no reactions found and we have a guild, try getting all reactions for the guild
            if ((!data || data.length === 0) && guildId) {
                console.log("useReactions: No reactions found by message ID, trying by guild ID:", guildId);
                data = await reactionApiService().getReactionsFromGuild(guildId);
                console.log("useReactions: Received reactions data (by guild ID):", data);
                // Filter reactions for this specific message if we get guild-wide reactions
                if (data && Array.isArray(data)) {
                    data = data.filter(reaction => reaction.messageId === messageId);
                    console.log("useReactions: Filtered reactions for message:", data);
                }
            }
            
            setReactions(data || []);
        } catch (error) {
            console.error("Failed to load reactions:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to load reactions"
            });
            setReactions([]);
        } finally {
            setLoading(false);
        }
    }, [messageId, guildId]);

    // Load available roles for the guild
    const loadRoles = useCallback(async () => {
        if (!guildId) {
            console.log("useReactions: No guildId provided");
            return;
        }

        console.log("useReactions: Loading roles for guildId:", guildId);
        try {
            setRolesLoading(true);
            const data = await roachDiscordApiService.getRolesInManagedGuild(guildId);
            console.log("useReactions: Received roles data:", data);
            setRoles(data);
        } catch (error) {
            console.error("Failed to load roles:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to load roles"
            });
        } finally {
            setRolesLoading(false);
        }
    }, [guildId]);

    // Load available emotes for the guild
    const loadEmotes = useCallback(async () => {
        if (!guildId) return;

        try {
            setEmotesLoading(true);
            const data = await roachDiscordApiService.getEmotesInManagedGuild(guildId);
            setEmotes(data);
        } catch (error) {
            console.error("Failed to load emotes:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to load emotes"
            });
        } finally {
            setEmotesLoading(false);
        }
    }, [guildId]);

    // Create a new reaction
    const createReaction = async (emoteId: string, roleId: string) => {
        if (!messageId || !guildId) return;

        // Find the role name
        const role = roles.find(r => r.id === roleId);
        if (!role) {
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Role not found"
            });
            return;
        }

        try {
            const reaction = await reactionApiService().createReactionById(
                messageId.toString(), 
                guildId, 
                emoteId, 
                roleId, 
                role.name
            );
            setReactions(prev => [...prev, reaction]);
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Reaction role created successfully"
            });
        } catch (error) {
            console.error("Failed to create reaction:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to create reaction role"
            });
            throw error;
        }
    };

    // Delete a reaction
    const deleteReaction = async (reactionId: number) => {
        try {
            await reactionApiService().deleteReaction(reactionId.toString());
            setReactions(prev => prev.filter(r => r.id !== reactionId));
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Reaction role deleted successfully"
            });
        } catch (error) {
            console.error("Failed to delete reaction:", error);
            toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: "Failed to delete reaction role"
            });
            throw error;
        }
    };

    // Load initial data when dependencies change
    useEffect(() => {
        console.log("useReactions useEffect triggered - messageId:", messageId, "guildId:", guildId);
        if (messageId) {
            loadReactions();
        }
    }, [messageId, loadReactions]);

    useEffect(() => {
        console.log("useReactions roles/emotes useEffect triggered - guildId:", guildId);
        if (guildId) {
            loadRoles();
            loadEmotes();
        }
    }, [guildId, loadRoles, loadEmotes]);

    return {
        reactions,
        roles,
        emotes,
        loading,
        rolesLoading,
        emotesLoading,
        createReaction,
        deleteReaction,
        toast
    };
}