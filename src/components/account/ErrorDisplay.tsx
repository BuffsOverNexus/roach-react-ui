import { Card } from "primereact/card";
import { Button } from "primereact/button";

interface ErrorDisplayProps {
    error: string;
    onRetry: () => void;
}

function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
    return (
        <Card className="p-6">
            <div className="text-center">
                <i className="pi pi-exclamation-triangle text-red-400 text-4xl mb-4" />
                <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Profile</h3>
                <p className="text-color-secondary">{error}</p>
                <Button 
                    label="Retry" 
                    icon="pi pi-refresh" 
                    className="mt-4"
                    onClick={onRetry}
                />
            </div>
        </Card>
    );
}

export default ErrorDisplay;