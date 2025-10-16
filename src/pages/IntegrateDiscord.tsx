import { guildApiService } from "@/api/guildApi";
import { roachDiscordApiService } from "@/api/roachDiscordApi";
import type { DiscordChannel, DiscordGuild } from "@/types/api";
import { discordUserAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function IntegrateDiscord() {
const { discordId } = useParams();
const router = useNavigate();
const [discordUser] = useAtom(discordUserAtom);
const [channels, setChannels] = useState<DiscordChannel[]>([]);
const [searchTerm, setSearchTerm] = useState<string>("");
const [filteredChannels, setFilteredChannels] = useState<DiscordChannel[]>([]);
const [discordGuild, setDiscordGuild] = useState<DiscordGuild | null>(null);
const [loading, setLoading] = useState(true);
const [creatingGuild, setCreatingGuild] = useState(false);
const toast = useRef<Toast>(null);

if (!discordUser) {
  router("/");
  return null;
}

useEffect(() => {
  async function fetchGuildData() {
    if (!discordId) return;
    
    try {
      setLoading(true);
      
      // Fetch user's managed guilds and channels concurrently
      const [userGuilds, channelsData] = await Promise.all([
        roachDiscordApiService.getUserManagedGuilds(discordUser!.id),
        roachDiscordApiService.getChannelsInManagedGuild(discordId)
      ]);

      // Find the specific guild by discordId
      const targetGuild = userGuilds.find(guild => guild.id === discordId);
      
      if (!targetGuild) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Guild not found or you don't have access to it."
        });
        router("/discords");
        return;
      }

      setDiscordGuild(targetGuild);
      setChannels(channelsData);
      setFilteredChannels(channelsData);
    } catch (error) {
      console.error("Error fetching guild data:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to load guild information. Please try again."
      });
    } finally {
      setLoading(false);
    }
  }
  
  fetchGuildData();
}, [discordId, discordUser.id, router]);

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

const handleCreateDiscord = async (channel: DiscordChannel) => {
  if (!discordGuild || !discordId) {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Guild information not available. Please refresh and try again."
    });
    return;
  }

  try {
    setCreatingGuild(true);
    
    // Create the guild with all required information
    await guildApiService().createGuild(
      discordUser.id,
      discordId,
      discordGuild.name,
      channel.name,
      channel.id
    );
    
    toast.current?.show({
      severity: "success", 
      summary: "Success",
      detail: `Successfully integrated ${discordGuild.name} with channel #${channel.name}`
    });

    // Navigate to the messages page for the created guild
    setTimeout(() => {
      router(`/messages/${discordId}`);
    }, 1500);
    
  } catch (error) {
    console.error("Error creating guild:", error);
    toast.current?.show({
      severity: "error",
      summary: "Error", 
      detail: "Failed to create guild integration. Please try again."
    });
  } finally {
    setCreatingGuild(false);
  }
}

const channelItemTemplate = (channel: DiscordChannel) => {
  const truncatedName =
    channel.name.length > 20
      ? channel.name.substring(0, 20) + "..."
      : channel.name;

  return (
    <Button
      label={`#${truncatedName}`}
      onClick={async () => {
        await handleCreateDiscord(channel);
      }}
      outlined
      disabled={creatingGuild}
      loading={creatingGuild}
      className="w-full"
    />
  );
};

const renderChannelGrid = () => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" />
      </div>
    );
  }

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
        <h2 className="text-xl font-bold">
          {discordGuild ? `Select a Channel for ${discordGuild.name}` : 'Select a Channel'}
        </h2>
        <div className="flex items-center gap-2">
          <span className="pi pi-search"></span>
          <InputText
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
            disabled={loading || creatingGuild}
          />
        </div>
      </div>
    </div>
  );
};

return (
  <>
    <Toast ref={toast} />
    <div>
      {searchHeader()}
      {renderChannelGrid()}
    </div>
  </>
);
}
export default IntegrateDiscord;