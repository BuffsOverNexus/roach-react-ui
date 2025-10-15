import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate, useLocation } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    command?: () => void;
}

interface PageBreadcrumbProps {
    items?: BreadcrumbItem[];
    showHome?: boolean;
}

function PageBreadcrumb({ items = [], showHome = true }: PageBreadcrumbProps) {
    const router = useNavigate();
    const location = useLocation();
    
    // If we're on the /discords page, show "My Discords" as a non-clickable item
    const isDiscordsPage = location.pathname === '/discords';
    
    const breadcrumbHome = showHome ? {  
        label: 'My Discords',
        command: isDiscordsPage ? undefined : () => router('/discords')
    } : undefined;

    return (
        <BreadCrumb 
            model={items} 
            home={breadcrumbHome}
            className="mb-4"
        />
    );
}

export default PageBreadcrumb;