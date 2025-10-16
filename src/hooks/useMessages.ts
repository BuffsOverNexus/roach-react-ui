import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { discordUserAtom } from '@/utils/atoms';
import { messageApiService } from '@/api/messageApi';
import { guildApiService } from '@/api/guildApi';
import { roachDiscordApiService } from '@/api/roachDiscordApi';
import type { Guild, Message } from '@/types/models';

export function useMessages(discordId: string | undefined) {
    const router = useNavigate();
    const [discordUser] = useAtom(discordUserAtom);
    const toast = useRef<Toast>(null);
    
    // Main state
    const [messages, setMessages] = useState<Message[]>([]);
    const [discord, setDiscord] = useState<Guild | null>(null);
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    
    // Create dialog state
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [newMessageSubject, setNewMessageSubject] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [touched, setTouched] = useState(false);
    
    // Edit subject dialog state
    const [showEditSubjectDialog, setShowEditSubjectDialog] = useState(false);
    const [editingMessage, setEditingMessage] = useState<Message | null>(null);
    const [editSubject, setEditSubject] = useState("");
    const [updatingSubject, setUpdatingSubject] = useState(false);
    const [editSubjectTouched, setEditSubjectTouched] = useState(false);
    
    // Channel dialog state
    const [showChannelDialog, setShowChannelDialog] = useState(false);
    const [channels, setChannels] = useState<any[]>([]);
    const [selectedChannelId, setSelectedChannelId] = useState<string>("");
    const [updatingChannel, setUpdatingChannel] = useState(false);

    // Redirect if no user
    useEffect(() => {
        if (!discordUser) {
            router("/");
            return;
        }
    }, [discordUser, router]);

    // Load messages and discord data
    useEffect(() => {
        async function retrieveMessage() {
            if (!discordId) return;

            setLoading(true);
            try {
                // Add 1 second delay as buffer
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Fetch messages and discord data in parallel
                const [messages, discord] = await Promise.all([
                    messageApiService().getMessagesFromGuild(discordId),
                    guildApiService().getGuildByRawId(discordId)
                ]);

                setMessages(messages);
                setDiscord(discord);
            } catch (error) {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load messages',
                    life: 3000
                });
            } finally {
                setLoading(false);
            }
        }

        retrieveMessage();
    }, [discordId]);

    // Message operations
    const handleRegenerateMessage = async (messageId: string) => {
        try {
            setLoading(true);
            await messageApiService().generateMessage(messageId);
            
            // Refresh messages after regeneration
            const updatedMessages = await messageApiService().getMessagesFromGuild(discordId!);
            setMessages(updatedMessages);
            
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Message regenerated successfully!',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to regenerate message',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteMessage = (messageId: string) => {
        confirmDialog({
            message: 'Are you sure you want to delete this message?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    setLoading(true);
                    await messageApiService().deleteMessage(messageId);
                    
                    // Remove message from local state
                    setMessages(prev => prev.filter(msg => msg.id.toString() !== messageId));
                    
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Message deleted successfully',
                        life: 3000
                    });
                } catch (error) {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete message',
                        life: 3000
                    });
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleRegenerateAll = async () => {
        if (messages.length === 0) return;

        try {
            setLoading(true);
            
            // Regenerate all messages in parallel
            await Promise.all(
                messages.map(message => 
                    messageApiService().generateMessage(message.id.toString())
                )
            );
            
            // Refresh messages after regeneration
            const updatedMessages = await messageApiService().getMessagesFromGuild(discordId!);
            setMessages(updatedMessages);
            
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'All messages regenerated successfully!',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to regenerate all messages',
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    // Create message operations
    const handleCreateMessage = () => {
        setShowCreateDialog(true);
        setNewMessageSubject("");
        setTouched(false);
    };

    const handleSubmitNewMessage = async () => {
        setTouched(true);
        
        if (!newMessageSubject.trim() || newMessageSubject.trim().length < 10) {
            return;
        }

        try {
            setSubmitting(true);
            
            // Create new message
            const newMessage = await messageApiService().createMessage(
                discordId!, newMessageSubject.trim()
            );
            
            // Add new message to local state
            setMessages(prev => [...prev, newMessage]);
            
            // Close dialog and reset form
            setShowCreateDialog(false);
            setNewMessageSubject("");
            setTouched(false);
            
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Message created successfully!',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to create message',
                life: 3000
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseCreateDialog = () => {
        setShowCreateDialog(false);
        setNewMessageSubject("");
        setTouched(false);
    };

    // Edit subject operations
    const handleOpenEditSubjectDialog = (message: Message) => {
        setEditingMessage(message);
        setEditSubject(message.subject);
        setEditSubjectTouched(false);
        setShowEditSubjectDialog(true);
    };

    const handleUpdateSubject = async () => {
        if (!editingMessage || !editSubject.trim() || editSubject.trim().length < 10) {
            setEditSubjectTouched(true);
            return;
        }

        try {
            setUpdatingSubject(true);
            
            // TODO: Add API call when available
            // await messageApiService().updateMessage(editingMessage.id.toString(), editSubject.trim());
            
            // For now, update local state
            setMessages(prev => prev.map(msg => 
                msg.id === editingMessage.id 
                    ? { ...msg, subject: editSubject.trim() }
                    : msg
            ));
            
            // Close dialog and reset
            setShowEditSubjectDialog(false);
            setEditingMessage(null);
            setEditSubject("");
            setEditSubjectTouched(false);
            
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Message subject updated successfully!',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update message subject',
                life: 3000
            });
        } finally {
            setUpdatingSubject(false);
        }
    };

    const handleCloseEditSubjectDialog = () => {
        setShowEditSubjectDialog(false);
        setEditingMessage(null);
        setEditSubject("");
        setEditSubjectTouched(false);
    };

    // Channel operations
    const handleOpenChannelDialog = async () => {
        if (!discordId || !discordUser) return;
        
        try {
            // Fetch channels from the Discord guild
            const guildChannels = await roachDiscordApiService.getChannelsInManagedGuild(discordId);
            setChannels(guildChannels);
            setSelectedChannelId(discord?.channelId || "");
            setShowChannelDialog(true);
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load channels',
                life: 3000
            });
        }
    };

    const handleUpdateChannel = async () => {
        if (!selectedChannelId || !discordId) return;

        try {
            setUpdatingChannel(true);
            
            // Find the selected channel to get its name
            const selectedChannel = channels.find(ch => ch.id === selectedChannelId);
            if (!selectedChannel) return;
            
            // Update the channel in the guild
            await guildApiService().updateChannelInGuild(discordId, selectedChannelId, selectedChannel.name);
            
            // Refresh the discord data to get the updated channel name
            const updatedDiscord = await guildApiService().getGuildByRawId(discordId);
            setDiscord(updatedDiscord);
            
            // Close dialog and reset
            setShowChannelDialog(false);
            setSelectedChannelId("");
            
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Channel updated successfully!',
                life: 3000
            });
        } catch (error) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update channel',
                life: 3000
            });
        } finally {
            setUpdatingChannel(false);
        }
    };

    const handleCloseChannelDialog = () => {
        setShowChannelDialog(false);
        setSelectedChannelId("");
    };

    return {
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
    };
}