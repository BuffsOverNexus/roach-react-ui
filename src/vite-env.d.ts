/// <reference types="vite/client" />

// Asset declarations
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

// Environment variable types
interface ImportMetaEnv {
  // Discord OAuth Configuration
  readonly VITE_DISCORD_CLIENT_ID: string
  readonly VITE_DISCORD_CLIENT_SECRET: string
  
  // Tenant Configuration
  readonly VITE_TENANT_NAME: string
  
  // API Configuration
  readonly VITE_API_BASE_URL: string
  readonly VITE_BOT_URL: string
  
  // Authentication Configuration
  readonly VITE_NEXTAUTH_SECRET: string
  
  // Environment Configuration
  readonly VITE_ENVIRONMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}