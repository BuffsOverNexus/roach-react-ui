import type { Message } from "@/types/models";
import type { ApiService } from "./api";
import env from "@/utils/env";

interface MessageApiService extends ApiService {
    getMessagesFromGuild: (rawGuildId: string) => Promise<Message[]>;
    createMessage: (rawGuildId: string, subject: string) => Promise<Message>;
    generateMessage: (messageId: string) => Promise<void>;
    deleteMessage: (messageId: string) => Promise<boolean>;
    getMessageByRoachId: (roachId: string) => Promise<Message | null>;
    updateMessage: (messageId: string, subject: string) => Promise<void>;
}

export const messageApiService = (baseRoute: string = "message"): MessageApiService => {
    return {
        route: baseRoute,
        getMessagesFromGuild: async (rawGuildId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/messages?guildId=${rawGuildId}`);
            return response.json();
        },
        createMessage: async (rawGuildId: string, subject: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subject, guildId: rawGuildId }),
            });
            return response.json();
        },
        generateMessage: async (messageId: string) => {
            await fetch(`${env.apiBaseUrl}/${baseRoute}/regenerate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messageId }),
            });
        },
        deleteMessage: async (messageId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}?id=${messageId}`, {
                method: "DELETE",
            });
            return response.ok;
        },
        getMessageByRoachId: async (roachId: string) => {
            const response = await fetch(`${env.apiBaseUrl}/${baseRoute}?id=${roachId}`);
            return response.json();
        },
        updateMessage: async (messageId: string, subject: string) => {
            await fetch(`${env.apiBaseUrl}/${baseRoute}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: messageId, subject }),
            });
        }
    };
};
