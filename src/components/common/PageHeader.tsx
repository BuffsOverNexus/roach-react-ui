interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    loading?: boolean;
    className?: string;
}

function PageHeader({ 
    title, 
    subtitle, 
    actions, 
    loading = false,
    className = "flex justify-between mb-4" 
}: PageHeaderProps) {
    return (
        <div className={className}>
            <div>
                <h1 className="text-2xl text-left font-bold">{title}</h1>
                {subtitle && (
                    <p className="text-color-secondary text-sm mt-1">{subtitle}</p>
                )}
            </div>
            {actions && !loading && (
                <div className="flex gap-2">
                    {actions}
                </div>
            )}
        </div>
    );
}

export default PageHeader;