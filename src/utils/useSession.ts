import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { 
  userAtom, 
  discordUserAtom, 
  discordTokenAtom,
  guildAtom,
  sessionStatusAtom,
  clearSession,
  isSessionValid
} from "./atoms";
import type { DiscordLoginResponse } from "@/types/models";
import type { DiscordUser } from "./discord";

/**
 * Enhanced session management hook
 * Handles automatic session validation, cleanup, and persistence
 */
export const useSession = () => {
  const [user, setUser] = useAtom(userAtom);
  const [discordUser, setDiscordUser] = useAtom(discordUserAtom);
  const [discordToken, setDiscordToken] = useAtom(discordTokenAtom);
  const [currentGuild, setCurrentGuild] = useAtom(guildAtom);
  const [sessionStatus] = useAtom(sessionStatusAtom);

  // Auto-cleanup expired sessions
  useEffect(() => {
    if (!isSessionValid() && (discordUser || discordToken)) {
      console.info("Session expired, clearing stored data");
      clearSession();
      setUser(undefined);
      setDiscordUser(undefined);
      setDiscordToken(undefined);
      setCurrentGuild(undefined);
    }
  }, []); // Only run once on mount to avoid loops

  // Initialize session from URL params (OAuth callback)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const callbackToken = urlParams.get("token");

    if (success && callbackToken) {
      // Store the token with proper typing
      const tokenData: DiscordLoginResponse = {
        success: "true",
        token: callbackToken,
      };
      
      setDiscordToken(tokenData);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [setDiscordToken]);

  const updateDiscordUser = useCallback((userData: DiscordUser) => {
    setDiscordUser(userData);
  }, [setDiscordUser]);

  const updateDiscordToken = useCallback((tokenData: DiscordLoginResponse) => {
    setDiscordToken(tokenData);
  }, [setDiscordToken]);

  const logout = useCallback(() => {
    clearSession();
    setUser(undefined);
    setDiscordUser(undefined);
    setDiscordToken(undefined);
    setCurrentGuild(undefined);
  }, [setUser, setDiscordUser, setDiscordToken, setCurrentGuild]);

  const refreshSession = useCallback(async () => {
    // You can implement token refresh logic here if your API supports it
    if (!isSessionValid()) {
      logout();
      return false;
    }
    return true;
  }, [logout]);

  return {
    // State
    user,
    discordUser,
    discordToken,
    currentGuild,
    sessionStatus,
    
    // Actions
    updateDiscordUser,
    updateDiscordToken,
    setCurrentGuild,
    logout,
    refreshSession,
    
    // Utilities
    isLoggedIn: sessionStatus.isLoggedIn,
    hasValidToken: sessionStatus.hasValidToken,
  };
};