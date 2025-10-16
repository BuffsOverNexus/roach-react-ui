import { DataView } from "primereact/dataview";
import DiscordList from "./DiscordList";
import DiscordsPageHeader from "./DiscordsPageHeader";
import type { DiscordGuild } from "@/types/api";

interface DiscordsDataViewProps {
    discords: DiscordGuild[];
    loading: boolean;
}

function DiscordsDataView({ discords, loading }: DiscordsDataViewProps) {
    const listTemplate = () => {
        return <DiscordList discords={discords} loading={loading} />;
    };

    return (
        <DataView
            value={loading ? [1, 2, 3, 4, 5] : discords}
            listTemplate={listTemplate}
            paginator={!loading && discords.length > 5}
            rows={5}
            header={<DiscordsPageHeader loading={loading} />}
        />
    );
}

export default DiscordsDataView;