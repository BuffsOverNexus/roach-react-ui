import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "@/utils/useSession";
import { getUser } from "@/utils/discord";
import { Message } from "primereact/message";
import { userApiService } from "@/api/userApi";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const LoginSuccess = () => {
    const session = useSession();
    const router = useNavigate();
    const query = useQuery();
    const success = query.get("success");
    const token = query.get("token");

    if (!success || !token) {
        return (
            <Message severity="error" text="An error occurred when logging you in. Try again or contact the server owner." />
        );
    }

    // Save this information using session management
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Update token using session management
                session.updateDiscordToken({ success, token });

                // Fetch user information from Discord API
                const userInfo = await getUser();
                session.updateDiscordUser(userInfo.user);

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
        if (!session.discordUser) {
            fetchUser();
        }
    }, [success, token, session, router]);

    return (
        <Message severity="success" text="Login successful! If you are new, your account has been created." />
    );
};

export default LoginSuccess;