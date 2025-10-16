import type { DiscordLoginResponse, User } from "@/types/models";
import type { DiscordGuild } from "@/types/api";
import { atom } from "jotai";
import type { DiscordUser } from "./discord";

/**
 * These are atoms that hold global state for the application.
 * 
 */
const userAtom = atom<User | undefined>(undefined);
const guildAtom = atom<DiscordGuild | undefined>(undefined);
const discordTokenAtom = atom<DiscordLoginResponse | undefined>(undefined);
const discordUserAtom = atom<DiscordUser | undefined>(undefined);

export { userAtom, guildAtom, discordTokenAtom, discordUserAtom };