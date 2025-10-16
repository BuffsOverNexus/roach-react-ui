import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { useSession } from "@/utils/useSession";
import { userApiService } from "@/api/userApi";
import type { User } from "@/types/models";

export function useAccount() {
    const session = useSession();
    const [dbUser, setDbUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useNavigate();
    const toast = useRef<Toast>(null);

    // Authentication check
    useEffect(() => {
        if (!session.discordUser) {
            router("/");
            return;
        }
    }, [session.discordUser, router]);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!session.discordUser) return;
            
            setLoading(true);
            setError(null); // Clear previous errors
            try {
                const userApi = userApiService();
                const userData = await userApi.getUser(session.discordUser.id);
                setDbUser(userData);
            } catch (err) {
                console.error("Error fetching user data:", err);
                const errorMessage = "Failed to load user information";
                setError(errorMessage);
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: errorMessage
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [session.discordUser]);

    const handleLogout = () => {
        confirmDialog({
            message: "Are you sure you want to logout?",
            header: "Confirm Logout",
            icon: "pi pi-sign-out",
            accept: () => {
                // Use session logout which clears all persistent data
                session.logout();
                toast.current?.show({
                    severity: "info",
                    summary: "Logged Out",
                    detail: "You have been successfully logged out"
                });
                router("/");
            }
        });
    };

    const handleBackToDashboard = () => {
        router("/discords");
    };

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        // Trigger a refetch by clearing and setting the user state
        if (session.discordUser) {
            const fetchUserData = async () => {
                try {
                    const userApi = userApiService();
                    const userData = await userApi.getUser(session.discordUser!.id);
                    setDbUser(userData);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setError("Failed to load user information");
                } finally {
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    };

    return {
        // State
        discordUser: session.discordUser,
        dbUser,
        loading,
        error,
        toast,
        
        // Actions
        handleLogout,
        handleBackToDashboard,
        handleRetry,
    };
}