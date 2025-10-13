/**
 * Model User
 *
 */
export type User = {
  id: number;
  rawId: string;
  lastLogin: Date;
  createdAt: Date;
  name: string;
  admin: boolean;
};

/**
 * Model Guild
 *
 */
export type Guild = {
  id: number;
  rawId: string;
  channelId: string;
  channelName: string;
  name: string;
  userId: number;
};

/**
 * Model Message
 *
 */
export type Message = {
  id: number;
  createdAt: Date;
  rawId: string | null;
  guildId: number;
  subject: string;
  description: string | null;
};

/**
 * Model Reaction
 *
 */
export type Reaction = {
  id: number;
  createdAt: Date;
  emoteId: string;
  roleId: string;
  roleName: string;
  messageId: number;
};
