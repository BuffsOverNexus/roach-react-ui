import { roachDiscordApiService } from "@/api/roachDiscordApi";
import type { DiscordChannel } from "@/types/api";
import { discordUserAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function IntegrateDiscord() {
const { discordId } = useParams();
const router = useNavigate();
const [discordUser] = useAtom(discordUserAtom);
const [channels, setChannels] = useState<DiscordChannel[]>([]);
const [searchTerm, setSearchTerm] = useState<string>("");
const [filteredChannels, setFilteredChannels] = useState<DiscordChannel[]>([]);

if (!discordUser) {
  router("/");
  return null;
}

useEffect(() => {
  async function fetchChannels() {
    if (!discordId) return;
    // Fetch channels from API based on discordId
    // Example: const response = await api.getChannels(discordId);
    // setChannels(response.data);
    const response = await roachDiscordApiService.getChannelsInManagedGuild(
      discordId
    );
    setChannels(response);
    setFilteredChannels(response);
  }
  fetchChannels();
}, [discordId]);

// Filter channels based on search term
useEffect(() => {
  if (!searchTerm) {
    setFilteredChannels(channels);
  } else {
    const filtered = channels.filter(
      (channel) =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.id.includes(searchTerm)
    );
    setFilteredChannels(filtered);
  }
}, [searchTerm, channels]);

const channelItemTemplate = (channel: DiscordChannel) => {
  const truncatedName =
    channel.name.length > 20
      ? channel.name.substring(0, 20) + "..."
      : channel.name;

  return (
    <Button
      label={`#${truncatedName}`}
      onClick={() => {
        router(`/reactions/${channel.id}`);
      }}
      outlined
      className="w-full"
    />
  );
};

const renderChannelGrid = () => {
  if (filteredChannels.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No channels found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {filteredChannels.map((channel) => (
        <div key={channel.id}>{channelItemTemplate(channel)}</div>
      ))}
    </div>
  );
};

const searchHeader = () => {
  return (
    <div className="p-4 border-b">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">Select a Channel</h2>
        <div className="flex items-center gap-2">
          <span className="pi pi-search"></span>
          <InputText
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

return (
  <>
    <div>
      {searchHeader()}
      {renderChannelGrid()}
    </div>
  </>
);
}
export default IntegrateDiscord;