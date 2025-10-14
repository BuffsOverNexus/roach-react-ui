import type { User } from "@/types/models";
import type { ApiService } from "./api";
import { discordUserAtom } from "@/utils/atoms";
import { getDefaultStore } from "jotai";
import env from "@/utils/env";

interface UserApiService extends ApiService {
    getUser: () => Promise<User>;
    createUser: () => Promise<User>;
}

export const createUserApiService = (baseRoute: string = "/user"): UserApiService => {
    return {
    route: baseRoute,
    getUser: async (): Promise<User> => {
        const store = getDefaultStore();
        const discordUser = store.get(discordUserAtom);

        if (!discordUser?.id) {
            throw new Error("No Discord user found. Please login first.");
        }

        // Use the Discord user ID to fetch the user data
        const response = await fetch(`${env.apiBaseUrl}/${baseRoute}/${discordUser.id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.statusText}`);
        }

        return response.json();
    },
    createUser: function (): Promise<User> {
        throw new Error("Function not implemented.");
    }
};
};

