import { Message } from "primereact/message";

interface EmptyStateProps {
    message: string;
    severity?: "success" | "info" | "warn" | "error";
    icon?: string;
    className?: string;
}

function EmptyState({ 
    message, 
    severity = "info", 
    icon,
    className = "w-full" 
}: EmptyStateProps) {
    return (
        <Message
            severity={severity}
            text={message}
            className={className}
            icon={icon}
        />
    );
}

export default EmptyState;