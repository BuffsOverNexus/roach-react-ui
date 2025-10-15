import { discordUserAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Divider } from "primereact/divider";
import { userApiService } from "@/api/userApi";
import { getDiscordAvatarUrl, formatDateTime, getRelativeTime } from "@/utils/common";
import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";
import type { User } from "@/types/models";

function Account() {
    const [discordUser, setDiscordUser] = useAtom(discordUserAtom);
    const [dbUser, setDbUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useNavigate();
    const toast = useRef<Toast>(null);

    // Make sure we do not render the page if user is not logged in.
    if (!discordUser) {
        router("/");
        return;
    }

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

    const InfoItem = ({ label, value, icon }: { label: string; value: string | React.ReactNode; icon?: string }) => (
        <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-2">
                {icon && <i className={`${icon} text-primary`} />}
                <span className="font-medium">{label}</span>
            </div>
            <div className="font-semibold">{value}</div>
        </div>
    );

    const ProfileSkeleton = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Skeleton shape="circle" size="6rem" />
                <div className="space-y-2">
                    <Skeleton width="12rem" height="2rem" />
                    <Skeleton width="8rem" height="1.5rem" />
                </div>
            </div>
            <div className="space-y-4">
                {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <Skeleton width="8rem" height="1.5rem" />
                        <Skeleton width="10rem" height="1.5rem" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Account Information</h1>
                <p className="text-color-secondary">Manage your profile and account settings</p>
            </div>

            {/* Privacy Disclaimer */}
            <Card className="p-4 border-l-4 border-l-blue-400 mb-6">
                <div className="flex items-start gap-3">
                    <i className="pi pi-info-circle text-blue-400 text-lg mt-1" />
                    <div>
                        <h3 className="text-base font-semibold mb-2 text-blue-400">Privacy Information</h3>
                        <p className="text-color-secondary text-sm leading-relaxed">
                            We only store your <strong>name</strong> and <strong>Discord ID</strong> in our database for account management purposes. 
                            All other information displayed below (avatar, email, verification status, locale, etc.) 
                            is provided directly by Discord through their API and is not stored on our servers.
                        </p>
                    </div>
                </div>
            </Card>

            {loading ? (
                <Card className="p-6">
                    <ProfileSkeleton />
                </Card>
            ) : error ? (
                <Card className="p-6">
                    <div className="text-center">
                        <i className="pi pi-exclamation-triangle text-red-400 text-4xl mb-4" />
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Profile</h3>
                        <p className="text-color-secondary">{error}</p>
                        <Button 
                            label="Retry" 
                            icon="pi pi-refresh" 
                            className="mt-4"
                            onClick={() => window.location.reload()}
                        />
                    </div>
                </Card>
            ) : (
                <div className="space-y-6">
                    {/* Profile Header */}
                    <Card className="p-6">
                        <div className="flex flex-col items-center justify-center gap-6 mb-6">
                            <img
                                src={getDiscordAvatarUrl(discordUser.id, discordUser.avatar, 96)}
                                alt={`${discordUser.username}'s avatar`}
                                className="w-24 h-24 rounded-full border-4 border-primary"
                            />
                            <div className="flex flex-col items-center justify-center">
                                <h2 className="text-2xl font-bold mb-1 text-center">
                                    {discordUser.username}
                                </h2>
                                <div className="flex items-center justify-center gap-2">
                                    {dbUser?.admin && (
                                        <Tag severity="danger" value="Administrator" />
                                    )}
                                    {discordUser.verified && (
                                        <Tag severity="success" value="Verified" />
                                    )}
                                    {discordUser.premium_type && discordUser.premium_type > 0 && (
                                        <Tag severity="info" value="Discord Nitro" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <Divider />

                        {/* Discord Information */}
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold mb-4">Discord Information</h3>
                            
                            <InfoItem 
                                label="Discord ID" 
                                value={discordUser.id}
                                icon="pi pi-id-card"
                            />
                            
                            <InfoItem 
                                label="Username" 
                                value={discordUser.username}
                                icon="pi pi-user"
                            />
                            
                            {discordUser.email && (
                                <InfoItem 
                                    label="Email" 
                                    value={discordUser.email}
                                    icon="pi pi-envelope"
                                />
                            )}
                            
                            <InfoItem 
                                label="Email Verified" 
                                value={
                                    <Tag 
                                        severity={discordUser.verified ? "success" : "warning"} 
                                        value={discordUser.verified ? "Yes" : "No"} 
                                    />
                                }
                                icon="pi pi-shield"
                            />
                            
                            {discordUser.locale && (
                                <InfoItem 
                                    label="Locale" 
                                    value={discordUser.locale.toUpperCase()}
                                    icon="pi pi-globe"
                                />
                            )}
                            
                            <InfoItem 
                                label="2FA Enabled" 
                                value={
                                    <Tag 
                                        severity={discordUser.mfa_enabled ? "success" : "warning"} 
                                        value={discordUser.mfa_enabled ? "Yes" : "No"} 
                                    />
                                }
                                icon="pi pi-lock"
                            />
                        </div>
                    </Card>

                    {/* Database Information */}
                    {dbUser && (
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Account Activity</h3>
                            
                            <div className="space-y-1">
                                <InfoItem 
                                    label="Account ID" 
                                    value={dbUser.id.toString()}
                                    icon="pi pi-hashtag"
                                />
                                
                                <InfoItem 
                                    label="Display Name" 
                                    value={dbUser.name}
                                    icon="pi pi-user"
                                />
                                
                                <InfoItem 
                                    label="First Joined" 
                                    value={
                                        <div className="text-right">
                                            <div className="font-medium">{formatDateTime(dbUser.createdAt)}</div>
                                            <div className="text-sm text-color-secondary">
                                                {getRelativeTime(dbUser.createdAt)}
                                            </div>
                                        </div>
                                    }
                                    icon="pi pi-calendar-plus"
                                />
                                
                                <InfoItem 
                                    label="Last Login" 
                                    value={
                                        <div className="text-right">
                                            <div className="font-medium">{formatDateTime(dbUser.lastLogin)}</div>
                                            <div className="text-sm text-color-secondary">
                                                {getRelativeTime(dbUser.lastLogin)}
                                            </div>
                                        </div>
                                    }
                                    icon="pi pi-sign-in"
                                />
                                
                                <InfoItem 
                                    label="Account Type" 
                                    value={
                                        <Tag 
                                            severity={dbUser.admin ? "danger" : "info"} 
                                            value={dbUser.admin ? "Administrator" : "User"} 
                                        />
                                    }
                                    icon="pi pi-cog"
                                />
                            </div>
                        </Card>
                    )}

                    {/* Actions */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                        <div className="flex gap-3">
                            <Button 
                                label="Logout" 
                                icon="pi pi-sign-out" 
                                severity="danger"
                                outlined
                                onClick={handleLogout}
                            />
                            <Button 
                                label="Back to Dashboard" 
                                icon="pi pi-home" 
                                outlined
                                onClick={() => router("/")}
                            />
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default Account;