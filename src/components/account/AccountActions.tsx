import { Card } from "primereact/card";
import { Button } from "primereact/button";

interface AccountActionsProps {
    onLogout: () => void;
    onBackToDashboard: () => void;
}

function AccountActions({ onLogout, onBackToDashboard }: AccountActionsProps) {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
            <div className="flex gap-3">
                <Button 
                    label="Logout" 
                    icon="pi pi-sign-out" 
                    severity="danger"
                    outlined
                    onClick={onLogout}
                />
                <Button 
                    label="Back to Dashboard" 
                    icon="pi pi-home" 
                    outlined
                    onClick={onBackToDashboard}
                />
            </div>
        </Card>
    );
}

export default AccountActions;