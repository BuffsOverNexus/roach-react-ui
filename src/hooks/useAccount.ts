import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { discordUserAtom } from "@/utils/atoms";
import { userApiService } from "@/api/userApi";
import type { User } from "@/types/models";

export function useAccount() {
    const [discordUser, setDiscordUser] = useAtom(discordUserAtom);
    const [dbUser, setDbUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useNavigate();
    const toast = useRef<Toast>(null);

    // Authentication check
    useEffect(() => {
        if (!discordUser) {
            router("/");
            return;
        }
    }, [discordUser, router]);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (!discordUser) return;
            
            setLoading(true);
            try {
                const userApi = userApiService();
                const userData = await userApi.getUser(discordUser.id);
                setDbUser(userData);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load user information");
                toast.current?.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to load user information"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [discordUser]);

    const handleLogout = () => {
        confirmDialog({
            message: "Are you sure you want to logout?",
            header: "Confirm Logout",
            icon: "pi pi-sign-out",
            accept: () => {
                setDiscordUser(undefined);
                localStorage.removeItem("discord_token");
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
        router("/");
    };

    const handleRetry = () => {
        window.location.reload();
    };

    return {
        // State
        discordUser,
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