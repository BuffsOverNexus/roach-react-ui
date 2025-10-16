import { PageHeader } from "@/components/common";

interface DiscordsPageHeaderProps {
    loading: boolean;
}

function DiscordsPageHeader({ loading }: DiscordsPageHeaderProps) {
    if (loading) {
        return (
            <PageHeader
                title="Your Discords"
                subtitle=""
                loading={true}
            />
        );
    }

    return (
        <PageHeader
            title="Your Discords"
            subtitle="Note: You must be the owner or have administrator role to setup a Discord."
        />
    );
}

export default DiscordsPageHeader;