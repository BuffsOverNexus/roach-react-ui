import type { User } from "@/types/models";
import type { ApiService } from "./api";
import env from "@/utils/env";

interface UserApiService extends ApiService {
    getUser: (id: string) => Promise<User | null>;
    createUser: (rawId: string, name: string) => Promise<User>;
    updateLastLogin: (rawId: string) => Promise<User>;
    getUserById(rawId: string): Promise<User | null>;
}

export const userApiService = (baseRoute: string = "user"): UserApiService => {
    return {
    route: baseRoute,
    getUser: async (id: string) => {
        const response = await fetch(`${env.apiBaseUrl}/${baseRoute}/${id}`);
        return response.json();
    },
    createUser: async (rawId: string, name: string) => {
        const response = await fetch(`${env.apiBaseUrl}/${baseRoute}`, {    
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rawId, name }),
        });
        return await response.json(); 
    },
    updateLastLogin: async (rawId: string) => {
        const response = await fetch(`${env.apiBaseUrl}/${baseRoute}/lastLogin?userId=${rawId}`, {
            method: "UPDATE"
        });
        return response.json();
    },
    getUserById: async (rawId: string) => {
        const response = await fetch(`${env.apiBaseUrl}/${baseRoute}?id=${rawId}`);
        return response.json();
    },
  }
};

