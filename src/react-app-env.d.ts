// src/react-app-env.d.ts

/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_API_BASE_URL: string;
    VITE_API_PORT: string;
    // Add other environment variables here if needed
  }
}
