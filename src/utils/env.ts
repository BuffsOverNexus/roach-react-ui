/**
 * Environment configuration helper
 * Provides type-safe access to environment variables
 */

interface EnvironmentConfig {
  // Discord OAuth
  discordClientId: string;
  discordClientSecret: string;
  
  // Tenant Configuration
  tenantName: string;
  
  // API Configuration
  apiBaseUrl: string;
  botUrl: string;
  
  // Auth Configuration
  nextAuthSecret: string;
  
  // App Configuration
  environment: 'development' | 'production' | 'test';
  isDevelopment: boolean;
  isProduction: boolean;
}

const env: EnvironmentConfig = {
  // Discord OAuth
  discordClientId: import.meta.env.VITE_DISCORD_CLIENT_ID || '',
  discordClientSecret: import.meta.env.VITE_DISCORD_CLIENT_SECRET || '',
  
  // Tenant Configuration
  tenantName: import.meta.env.VITE_TENANT_NAME || 'roach_local',
  
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  botUrl: import.meta.env.VITE_BOT_URL || 'https://roach.buffsovernexus.com',
  
  // Auth Configuration
  nextAuthSecret: import.meta.env.VITE_NEXTAUTH_SECRET || '',
  
  // App Configuration
  environment: (import.meta.env.VITE_ENVIRONMENT || 'development') as 'development' | 'production' | 'test',
  isDevelopment: import.meta.env.VITE_ENVIRONMENT !== 'production',
  isProduction: import.meta.env.VITE_ENVIRONMENT === 'production',
};

// Validation helper to ensure required environment variables are set
export const validateEnvironment = (): void => {
  const required = ['tenantName', 'apiBaseUrl'] as const;
  const missing: string[] = [];
  
  required.forEach((key) => {
    if (!env[key]) {
      missing.push(`VITE_${key.toUpperCase()}`);
    }
  });
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
};

export { env };
export default env;