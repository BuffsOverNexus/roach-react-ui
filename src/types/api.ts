
type DiscordGuild = {
  id: string;
  ownerId: string;
  name: string;
  exists: boolean;
  owner: boolean;
  icon: string;
}

type DiscordRole = {
    id: string;
    name: string;
}

type DiscordEmote = {
    id: string;
    name: string;
    image: string;
}

type DiscordChannel = {
    id: string;
    name: string;
}

export type { DiscordGuild, DiscordRole, DiscordEmote, DiscordChannel };