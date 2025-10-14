import type { DiscordChannel, DiscordEmote, DiscordGuild, DiscordRole } from "@/types/api";
import type { ApiService } from "./api";
import { env } from "@/utils/env";

interface RoachDiscordApiService extends ApiService {
    getUserManagedGuilds: (rawId: string) => Promise<DiscordGuild[]>;
    getRolesInManagedGuild: (guildId: string) => Promise<DiscordRole[]>;
    getEmotesInManagedGuild: (guildId: string) => Promise<DiscordEmote[]>;
    getChannelsInManagedGuild: (guildId: string) => Promise<DiscordChannel[]>;
}

export const roachDiscordApiService: RoachDiscordApiService = {
    route: 'discord',

    async getUserManagedGuilds(rawId: string): Promise<DiscordGuild[]> {
        const response = await fetch(
          `${env.apiBaseUrl}/${this.route}/guilds?userId=${rawId}`
        );
        return response.json();
    },

    async getRolesInManagedGuild(guildId: string): Promise<DiscordRole[]> {
        const response = await fetch(`${env.apiBaseUrl}/${this.route}/roles?guildId=${guildId}`);
        return response.json();
    },

    async getEmotesInManagedGuild(guildId: string): Promise<DiscordEmote[]> {
        const response = await fetch(`${env.apiBaseUrl}/${this.route}/emotes?guildId=${guildId}`);
        return response.json();
    },

    async getChannelsInManagedGuild(guildId: string): Promise<DiscordChannel[]> {
        const response = await fetch(`${env.apiBaseUrl}/${this.route}/channels?guildId=${guildId}`);
        return response.json();
    }
}