import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import InfoItem from "./InfoItem";
import type { DiscordUser } from "@/utils/discord";

interface DiscordInformationProps {
    discordUser: DiscordUser;
}

function DiscordInformation({ discordUser }: DiscordInformationProps) {
    return (
        <Card className="p-6">
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
    );
}

export default DiscordInformation;