import PageBreadcrumb from "@/components/navigation/PageBreadcrumb";

interface PageLayoutProps {
    children: React.ReactNode;
    breadcrumbItems?: Array<{ label: string; command?: () => void }>;
    showHomeBreadcrumb?: boolean;
    className?: string;
}

function PageLayout({ 
    children, 
    breadcrumbItems, 
    showHomeBreadcrumb = true,
    className = "p-6" 
}: PageLayoutProps) {
    return (
        <div className={className}>
            {(breadcrumbItems || showHomeBreadcrumb) && (
                <PageBreadcrumb 
                    items={breadcrumbItems} 
                    showHome={showHomeBreadcrumb} 
                />
            )}
            {children}
        </div>
    );
}

export default PageLayout;