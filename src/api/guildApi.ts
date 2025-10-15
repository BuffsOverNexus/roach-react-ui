import type { Guild } from "@/types/models";
import type { ApiService } from "./api";
import { env } from "@/utils/env";

interface GuildApiService extends ApiService {
    getGuildByRawId: (rawId: string) => Promise<Guild | null>;
    getGuildsByUser: (rawUserId: string) => Promise<Guild[]>;
    createGuild: (userId: string, guildId: string, guildName: string, channelName: string, channelId: string) => Promise<Guild>;
    updateChannelInGuild: (guildId: string, channelId: string, channelName: string) => Promise<Guild>;
    getGuildByRoachId: (id: string) => Promise<Guild | null>;
}

export const guildApiService = (baseRoute: string = "guild"): GuildApiService => {
    return {
        route: baseRoute,
        getGuildByRawId: async (rawId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}/by-raw?guildId=${rawId}`);
            return await response.json();
        },
        getGuildsByUser: async (rawUserId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/user/guild/${rawUserId}`);
            return await response.json();
        },
        createGuild: async (userId: string, guildId: string, guildName: string, channelName: string, channelId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, guildId, guildName, channelName, channelId }),
            });
            return await response.json();
        },
        updateChannelInGuild: async (guildId: string, channelId: string, channelName: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}/channel`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ guildId, channelId, channelName }),
            });
            return await response.json();
        },
        getGuildByRoachId: async (id: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}/by-id?guildId=${id}`);
            return await response.json();
        },
    };
}