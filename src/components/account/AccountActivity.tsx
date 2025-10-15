import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import InfoItem from "./InfoItem";
import { formatDateTime, getRelativeTime } from "@/utils/common";
import type { User } from "@/types/models";

interface AccountActivityProps {
    dbUser: User;
}

function AccountActivity({ dbUser }: AccountActivityProps) {
    return (
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
    );
}

export default AccountActivity;