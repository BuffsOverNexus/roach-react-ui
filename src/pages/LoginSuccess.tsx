import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { discordTokenAtom, discordUserAtom } from "@utils/atoms";
import { getUser } from "@/utils/discord";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const LoginSuccess = () => {
    const [_, setDiscordToken] = useAtom(discordTokenAtom);
    const router = useNavigate();
    const query = useQuery();
    const success = query.get("success");
    const token = query.get("token");
    const [discordUser, setDiscordUser] = useAtom(discordUserAtom);

    if (!success || !token) {
        return (
            <div>
                <h1>Login Failed</h1>
                <p>Missing required query parameters.</p>
            </div>
        );
    }

    // Save this information to an atom
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setDiscordToken({ success, token });

                // Fetch user information from Discord API
                const userInfo = await getUser();
                setDiscordUser(userInfo.user);
                router("/account");
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        
        // Only fetch if we haven't already fetched the user
        if (!discordUser) {
            fetchUser();
        }
    }, [success, token, setDiscordToken]);

    return (
        <div>
            <h1>Login Success</h1>
            <p>You have successfully logged in!</p>
        </div>
    );
};

export default LoginSuccess;