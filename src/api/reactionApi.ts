import type { Reaction } from "@/types/models";
import type { ApiService } from "./api";
import env from "@/utils/env";

interface ReactionApiService extends ApiService {
    createReactionById: (messageId: string, guildId: string, emoteId: string, roleId: string, roleName: string) => Promise<Reaction>;
    getReactionsFromGuild: (guildId: string) => Promise<Reaction[]>;
    getReactionsFromMessage: (messageId: string) => Promise<Reaction[]>;
    getReactionsFromRoachMessage: (roachId: string) => Promise<Reaction[]>;
    deleteReaction: (reactionId: string) => Promise<Reaction>;
}

export const reactionApiService = (baseRoute: string = "reaction"): ReactionApiService => {
    return {
        route: baseRoute,
        createReactionById: async (messageId: string, guildId: string, emoteId: string, roleId: string, roleName: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messageId, guildId, emoteId, roleId, roleName }),
            });
            return response.json();
        },
        getReactionsFromGuild: async (guildId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/reactions/by-guild?guildId=${guildId}`);
            return response.json();
        },
        getReactionsFromMessage: async (messageId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/reactions?messageId=${messageId}`);
            return response.json();
        },
        getReactionsFromRoachMessage: async (roachId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/reactions/by-id?messageId=${roachId}`);
            return response.json();
        },
        deleteReaction: async (reactionId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}?reactionId=${reactionId}`, {
                method: "DELETE",
            });
            return response.json();
        }
    };
}