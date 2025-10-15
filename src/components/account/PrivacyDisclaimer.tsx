import { Card } from "primereact/card";

function PrivacyDisclaimer() {
    return (
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
    );
}

export default PrivacyDisclaimer;