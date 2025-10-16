import type { DiscordLoginResponse, User } from "@/types/models";
import type { DiscordGuild } from "@/types/api";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { DiscordUser } from "./discord";

/**
 * Enhanced atoms with automatic persistence and expiration
 * These replace the old memory-only atoms with localStorage persistence
 */

// Helper to create atoms with expiration
const createExpiringAtom = <T>(key: string, defaultValue: T, expirationMs: number = 24 * 60 * 60 * 1000) => {
  return atomWithStorage(
    key,
    defaultValue,
    {
      getItem: (key: string) => {
        try {
          const item = localStorage.getItem(key);
          if (!item) return defaultValue;
          
          const parsed = JSON.parse(item);
          
          // Check if expired
          if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
            localStorage.removeItem(key);
            return defaultValue;
          }
          
          return parsed.value;
        } catch {
          localStorage.removeItem(key);
          return defaultValue;
        }
      },
      setItem: (key: string, value: T) => {
        try {
          const item = {
            value,
            expiresAt: Date.now() + expirationMs
          };
          localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
          console.warn('Failed to persist to localStorage:', error);
        }
      },
      removeItem: (key: string) => {
        localStorage.removeItem(key);
      }
    }
  );
};

/**
 * Persistent atoms that replace the old memory-only versions
 */

// User session data (expires in 24 hours)
const userAtom = createExpiringAtom<User | undefined>(
  'roach-user-session', 
  undefined,
  24 * 60 * 60 * 1000 // 24 hours
);

// Discord user data (expires in 24 hours)
const discordUserAtom = createExpiringAtom<DiscordUser | undefined>(
  'roach-discord-user',
  undefined,
  24 * 60 * 60 * 1000
);

// Discord token (expires in 6 hours for security)
const discordTokenAtom = createExpiringAtom<DiscordLoginResponse | undefined>(
  'roach-discord-token',
  undefined,
  6 * 60 * 60 * 1000 // 6 hours
);

// Current guild (expires in 1 hour - frequently changing)
const guildAtom = createExpiringAtom<DiscordGuild | undefined>(
  'roach-current-guild',
  undefined,
  1 * 60 * 60 * 1000 // 1 hour
);

// Session preferences (long-lived, expires in 30 days)
export const userPreferencesAtom = atomWithStorage('roach-user-preferences', {
  theme: 'dark',
  language: 'en',
  lastSelectedGuildId: null as string | null,
});

// Session utility functions
export const clearSession = () => {
  localStorage.removeItem('roach-user-session');
  localStorage.removeItem('roach-discord-user'); 
  localStorage.removeItem('roach-discord-token');
  localStorage.removeItem('roach-current-guild');
  // Keep user preferences
};

// Check if session is valid
export const isSessionValid = (): boolean => {
  try {
    const tokenData = localStorage.getItem('roach-discord-token');
    if (!tokenData) return false;
    
    const parsed = JSON.parse(tokenData);
    return parsed.expiresAt && Date.now() < parsed.expiresAt;
  } catch {
    return false;
  }
};

// Session monitoring atom (derived)
export const sessionStatusAtom = atom((get) => {
  const discordUser = get(discordUserAtom);
  const discordToken = get(discordTokenAtom);
  
  return {
    isLoggedIn: !!(discordUser && discordToken),
    hasValidToken: isSessionValid(),
    user: discordUser,
  };
});

export { userAtom, guildAtom, discordTokenAtom, discordUserAtom };