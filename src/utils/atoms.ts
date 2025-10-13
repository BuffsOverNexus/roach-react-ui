import type { Guild, User } from "@/types/models";
import { atom } from "jotai";

/**
 * These are atoms that hold global state for the application.
 * 
 */
const userAtom = atom<User | undefined>(undefined);
const guildAtom = atom<Guild | undefined>(undefined);
const discordAuthAtom = atom<string | undefined>(undefined);

export { userAtom, guildAtom, discordAuthAtom };