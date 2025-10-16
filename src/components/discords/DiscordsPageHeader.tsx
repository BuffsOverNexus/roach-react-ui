import { PageHeader } from "@/components/common";

interface DiscordsPageHeaderProps {
    loading: boolean;
}

function DiscordsPageHeader({ loading }: DiscordsPageHeaderProps) {
    if (loading) {
        return (
            <PageHeader
                title="My Discords"
                subtitle=""
                loading={true}
            />
        );
    }

    return (
        <PageHeader
            title="My Discords"
            subtitle="Note: You must be the owner or have administrator role to setup a Discord."
        />
    );
}

export default DiscordsPageHeader;