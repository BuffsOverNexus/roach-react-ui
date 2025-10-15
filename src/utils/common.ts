/**
 * Common utility functions used throughout the application
 */

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Formats a Discord username by capitalizing the first letter
 * @param username - The Discord username to format
 * @returns The formatted username with first letter capitalized
 */
export function formatDiscordUsername(username: string): string {
  return capitalizeFirstLetter(username);
}

/**
 * Gets the Discord avatar URL for a user
 * @param userId - The Discord user ID
 * @param avatarHash - The avatar hash from Discord
 * @param size - The desired avatar size (default: 128)
 * @returns The full Discord avatar URL
 */
export function getDiscordAvatarUrl(userId: string, avatarHash: string | null, size: number = 128): string {
  if (!avatarHash) {
    // Return default Discord avatar for users without custom avatars
    const defaultAvatarId = parseInt(userId) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarId}.png?size=${size}`;
  }
  
  const extension = avatarHash.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}?size=${size}`;
}

/**
 * Formats a date to a human-readable string
 * @param date - The date to format (Date object or string)
 * @returns A formatted date string like "January 15, 2024"
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formats a date with time to a human-readable string
 * @param date - The date to format (Date object or string)
 * @returns A formatted date string like "January 15, 2024 at 3:30 PM"
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Gets a relative time string (e.g., "2 days ago", "Just now")
 * @param date - The date to compare (Date object or string)
 * @returns A relative time string
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}