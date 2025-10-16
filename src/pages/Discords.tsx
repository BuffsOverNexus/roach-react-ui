import { PageLayout } from "@/components/common";
import DiscordsDataView from "@/components/discords/DiscordsDataView";
import { useDiscords } from "@/hooks/useDiscords";

function Discords() {
    const { discords, loading } = useDiscords();

    return (
        <PageLayout>
            <DiscordsDataView discords={discords} loading={loading} />
        </PageLayout>
    );
}
export default Discords;