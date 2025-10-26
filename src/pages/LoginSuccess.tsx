import { useEffect, useState } from "react";
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
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!success || !token) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
                <Message severity="error" text="An error occurred when logging you in. Missing credentials. Try again or contact the server owner." />
            </div>
        );
    }

    // Save this information using session management
    useEffect(() => {
        // Prevent multiple calls
        if (isProcessing || session.discordUser) {
            return;
        }

        const fetchUser = async () => {
            try {
                setIsProcessing(true);

                // Update token using session management (only if not already set)
                if (!session.discordToken) {
                    session.updateDiscordToken({ success, token });
                }

                // Fetch user information from Discord API
                const userInfo = await getUser();
                session.updateDiscordUser(userInfo.user);

                // Validate if the user exists in the backend
                const user = await userApiService().getUser(userInfo.user.id);
                if (!user) {
                    // If user does not exist, create a new user
                    await userApiService().createUser(userInfo.user.id, userInfo.user.username);
                }

                console.log("LoginSuccess: User setup complete, redirecting to account");
                // Add a small delay to ensure state is properly set
                setTimeout(() => {
                    router("/account");
                }, 500);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setError("Failed to complete login process. Please try again.");
                setIsProcessing(false);
            }
        };
        
        fetchUser();
    }, [success, token, session, router, isProcessing]);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
                <Message severity="error" text={error} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
            <Message 
                severity="success" 
                text={isProcessing ? "Processing login..." : "Login successful! Redirecting to your account..."} 
            />
        </div>
    );
};

export default LoginSuccess;