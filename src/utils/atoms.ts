import type { DiscordLoginResponse, Guild, User } from "@/types/models";
import { atom } from "jotai";
import type { DiscordUser } from "./discord";

/**
 * These are atoms that hold global state for the application.
 * 
 */
const userAtom = atom<User | undefined>(undefined);
const guildAtom = atom<Guild | undefined>(undefined);
const discordTokenAtom = atom<DiscordLoginResponse | undefined>(undefined);
const discordUserAtom = atom<DiscordUser | undefined>(undefined);

export { userAtom, guildAtom, discordTokenAtom, discordUserAtom };