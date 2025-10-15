import { useAtom } from "jotai";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { discordTokenAtom, discordUserAtom } from "@utils/atoms";
import { getUser } from "@/utils/discord";
import { Message } from "primereact/message";
import { userApiService } from "@/api/userApi";

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
            <Message severity="error" text="An error occurred when logging you in. Try again or contact the server owner." />
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

                // Validate if the user exists in the backend
                const user = await userApiService().getUser(userInfo.user.id);
                if (!user) {
                    // If user does not exist, create a new user
                    await userApiService().createUser(userInfo.user.id, userInfo.user.username);
                }
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
        <Message severity="success" text="Login successful! If you are new, your account has been created." />
    );
};

export default LoginSuccess;