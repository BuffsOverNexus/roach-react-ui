import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";

interface LoadingSpinnerProps {
    message?: string;
    size?: "small" | "normal" | "large";
    className?: string;
}

function LoadingSpinner({ 
    message = "Loading...", 
    size = "normal",
    className = "flex flex-col items-center justify-center p-8" 
}: LoadingSpinnerProps) {
    const sizeMap = {
        small: "2rem",
        normal: "3rem", 
        large: "4rem"
    };

    return (
        <Card className={className}>
            <div className="text-center">
                <ProgressSpinner 
                    style={{ width: sizeMap[size], height: sizeMap[size] }}
                    strokeWidth="3"
                />
                {message && <p className="mt-4 text-color-secondary">{message}</p>}
            </div>
        </Card>
    );
}

export default LoadingSpinner;