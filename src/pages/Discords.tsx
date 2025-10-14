import { discordUserAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { DataView } from "primereact/dataview";
import DiscordsDataViewHeader from "@/components/discords/DiscordsDataViewHeader";
import DiscordList from "@/components/discords/DiscordList";
import { roachDiscordApiService } from "@/api/roachDiscordApi";
import type { DiscordGuild } from "@/types/api";
import { useNavigate } from "react-router-dom";

function Discords() {
    const router = useNavigate();
    const [discordUser] = useAtom(discordUserAtom);
    const [discords, setDiscords] = useState<DiscordGuild[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!discordUser) {
            router("/");
            return;
        }

        // Fetch the list of Discords from the API
        const fetchDiscords = async () => {
            setLoading(true);
            // Add 2 second delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            const response: DiscordGuild[] = await roachDiscordApiService.getUserManagedGuilds(discordUser.id);
            // You may want to set the discords state here if needed
            setDiscords(response);
            setLoading(false);
        };
        fetchDiscords();
    }, []);

    const listTemplate = () => {
        return <DiscordList discords={discords} loading={loading} />;
    }

    return (
      <div>
        <DataView
          value={loading ? [1, 2, 3, 4, 5] : discords}
          listTemplate={listTemplate}
          paginator={!loading && discords.length > 5 ? true : false}
          rows={5}
          header={<DiscordsDataViewHeader />}
        />
      </div>
    );
}
export default Discords;