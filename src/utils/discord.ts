import { useState, useEffect } from "react";
import axios from "axios";
import { env } from "@utils/env";
import { useSession } from "@utils/useSession";

// Axios error type for older versions of axios
type AxiosError<T = any> = {
  response?: {
    data: T;
    status: number;
    statusText: string;
  };
  message: string;
  name: string;
};

const API_BASE = env.oauthBaseUrl;

// Discord API types
export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
  verified?: boolean;
  locale?: string;
  mfa_enabled?: boolean;
  premium_type?: number;
  public_flags?: number;
  flags?: number;
}

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

interface UserResponse {
  user: DiscordUser;
  guilds: DiscordGuild[];
  tenant: string;
}

interface ApiError {
  error: string;
  hint?: string;
}



interface UseDiscordAuthReturn {
  user: UserResponse | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  refetch: () => Promise<void>;
  tenantExists: boolean | null;
  createTenant: (redirectUrl: string, jwtToken: string) => Promise<void>;
}

export const useDiscordAuth = (): UseDiscordAuthReturn => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tenantExists, setTenantExists] = useState<boolean | null>(null);
  
  // Use the new session management
  const session = useSession();
  const tenantName = env.tenantName;

  if (!tenantName) {
    throw new Error("Tenant name is not configured in environment variables");
  }

  // Auto-fetch user data when we have a token
  useEffect(() => {
    const fetchUserData = async () => {
      if (session.discordToken?.token && !session.discordUser) {
        try {
          setIsLoading(true);
          const userData = await getUser();
          session.updateDiscordUser(userData.user);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setError(err instanceof Error ? err.message : "Failed to fetch user data");
          // If token is invalid, logout
          if (err instanceof Error && err.message.includes("expired")) {
            session.logout();
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session.discordToken, session.discordUser, session]);

  // Check for OAuth callback parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const error = urlParams.get("error");
    const callbackToken = urlParams.get("token");

    if (success && callbackToken) {
      // This is now handled by useSession hook, but keep for backwards compatibility
      const tokenData = {
        success: "true",
        token: callbackToken,
      };
      session.updateDiscordToken(tokenData);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      // OAuth error
      setError(urlParams.get("error_description") || "Authentication failed");
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [session]);

  
  const createTenant = async (
    redirectUrl: string,
    jwtToken: string
  ): Promise<void> => {
    if (!tenantName || !redirectUrl || !jwtToken) {
      setError("Tenant name, redirect URL, and JWT token are required");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      await axios.post(
        `${API_BASE}/tenant`,
        {
          name: tenantName,
          redirectUrl: redirectUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTenantExists(true);
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      const errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Failed to create tenant";
      setError(errorMessage);
      setTenantExists(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (): Promise<void> => {
    if (!tenantName) {
      setError("Tenant name is required");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const response = await axios.get<{ authorizationUrl: string }>(
        `${API_BASE}/auth/discord/login?tenant=${encodeURIComponent(
          tenantName
        )}`
      );

      setTenantExists(true);
      // Redirect to Discord OAuth
      window.location.href = response.data.authorizationUrl;
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;

      // Check if tenant doesn't exist (404 error)
      if (axiosError.response?.status === 404) {
        setTenantExists(false);
        setError(
          "Tenant not found. Please create the tenant first with a redirect URL."
        );
      } else {
        const errorMessage =
          axiosError.response?.data?.error ||
          axiosError.message ||
          "Failed to initiate login";
        setError(errorMessage);
      }
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    session.logout(); // This now clears all persisted data
    setError(null);
  };

  const refetch = async (): Promise<void> => {
    if (session.discordToken?.token) {
      try {
        const userData = await getUser();
        session.updateDiscordUser(userData.user);
      } catch (err) {
        console.error("Failed to refetch user data:", err);
        setError(err instanceof Error ? err.message : "Failed to refetch user data");
      }
    }
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: session.isLoggedIn,
    login,
    logout,
    refetch,
    tenantExists,
    createTenant,
  };
};

// Helper function to get Discord avatar URL
export const getDiscordAvatarUrl = (
  userId: string,
  avatar: string | null,
  size: number = 128
): string => {
  if (avatar) {
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=${size}`;
  }
  // Default Discord avatar
  const defaultAvatarNumber = parseInt(userId) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
};

// Helper function to format Discord username (handles new username system)
export const formatDiscordUsername = (user: DiscordUser): string => {
  // New username system (discriminator is "0")
  if (user.discriminator === "0" || user.discriminator === "0000") {
    return `@${user.username}`;
  }
  // Legacy username system
  return `${user.username}#${user.discriminator}`;
};

// Response type for direct Discord API calls
interface DirectDiscordUserResponse {
  user: DiscordUser;
}

// Rate limiting cache to prevent too many requests
let lastUserFetch: number = 0;
let cachedUserResponse: DirectDiscordUserResponse | null = null;
const RATE_LIMIT_MS = 5000; // 5 seconds between requests

/**
 * Get user information and guilds using the token stored in localStorage
 * This function calls Discord's API directly to ensure we get the correct user's data
 * @returns Promise containing the authenticated user's data and guilds
 * @throws Will throw an error if no token is available or if the API request fails
 */
export const getUser = async (): Promise<DirectDiscordUserResponse> => {
  // Get token from session storage
  const tokenData = JSON.parse(localStorage.getItem('roach-discord-token') || '{}');
  
  if (!tokenData.value?.token) {
    throw new Error("No Discord token available. Please login first.");
  }

  // Check if we have a recent cached response to avoid rate limiting
  const now = Date.now();
  if (cachedUserResponse && (now - lastUserFetch) < RATE_LIMIT_MS) {
    return cachedUserResponse;
  }

  try {
    // Call Discord API directly to get the current user's information
    const [userResponse] = await Promise.all([
      axios.get<DiscordUser>("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${tokenData.value.token}`,
        },
      }),
      // axios.get<DiscordGuild[]>("https://discord.com/api/v10/users/@me/guilds", {
      //   headers: {
      //     Authorization: `Bearer ${tokenData.value.token}`,
      //   },
      // }),
    ]);

    const result = {
      user: userResponse.data,
    };

    // Cache the response
    cachedUserResponse = result;
    lastUserFetch = now;

    return result;
  } catch (err) {
    const axiosError = err as AxiosError<ApiError>;

    if (axiosError.response?.status === 401) {
      throw new Error("Discord token expired or invalid. Please login again.");
    }

    if (axiosError.response?.status === 429) {
      throw new Error("Rate limited by Discord API. Please wait a moment before trying again.");
    }

    const errorMessage =
      axiosError.response?.data?.error ||
      axiosError.message ||
      "Failed to fetch user info from Discord";
    
    throw new Error(errorMessage);
  }
};

export default useDiscordAuth;
