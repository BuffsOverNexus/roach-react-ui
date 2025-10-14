// Common types used throughout the application
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}