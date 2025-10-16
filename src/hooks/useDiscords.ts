import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { discordUserAtom } from '@/utils/atoms';
import { roachDiscordApiService } from '@/api/roachDiscordApi';
import type { DiscordGuild } from '@/types/api';

export function useDiscords() {
    const router = useNavigate();
    const [discordUser] = useAtom(discordUserAtom);
    const [discords, setDiscords] = useState<DiscordGuild[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!discordUser) {
            router('/');
            return;
        }

        // Fetch the list of Discords from the API
        const fetchDiscords = async () => {
            setLoading(true);
            try {
                // Add 1 second delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                const response: DiscordGuild[] = await roachDiscordApiService.getUserManagedGuilds(discordUser.id);
                setDiscords(response);
            } catch (error) {
                console.error('Failed to fetch discords:', error);
                setDiscords([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscords();
    }, [discordUser, router]);

    return {
        discords,
        loading,
        discordUser
    };
}