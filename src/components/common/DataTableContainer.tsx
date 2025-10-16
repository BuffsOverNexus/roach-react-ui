import type { ReactNode } from "react";

interface DataTableContainerProps {
    children: ReactNode;
    className?: string;
}

function DataTableContainer({ children, className = "" }: DataTableContainerProps) {
    return (
        <div className={`border border-surface-200 rounded-lg overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

export default DataTableContainer;