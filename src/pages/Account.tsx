import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import PrivacyDisclaimer from "@/components/account/PrivacyDisclaimer";
import ProfileHeader from "@/components/account/ProfileHeader";
import DiscordInformation from "@/components/account/DiscordInformation";
import AccountActivity from "@/components/account/AccountActivity";
import AccountActions from "@/components/account/AccountActions";
import ProfileSkeleton from "@/components/account/ProfileSkeleton";
import ErrorDisplay from "@/components/account/ErrorDisplay";
import { useAccount } from "@/hooks/useAccount";

function Account() {
    const {
        discordUser,
        dbUser,
        loading,
        error,
        toast,
        handleLogout,
        handleBackToDashboard,
        handleRetry,
    } = useAccount();

    // Redirect if not logged in
    if (!discordUser) {
        return null;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Account Information</h1>
                <p className="text-color-secondary">Manage your profile and account settings</p>
            </div>

            <PrivacyDisclaimer />

            {loading ? (
                <ProfileSkeleton />
            ) : error ? (
                <ErrorDisplay error={error} onRetry={handleRetry} />
            ) : (
                <div className="space-y-6">
                    <ProfileHeader discordUser={discordUser} dbUser={dbUser} />
                    <DiscordInformation discordUser={discordUser} />
                    {dbUser && <AccountActivity dbUser={dbUser} />}
                    <AccountActions 
                        onLogout={handleLogout} 
                        onBackToDashboard={handleBackToDashboard} 
                    />
                </div>
            )}
        </div>
    );
}

export default Account;