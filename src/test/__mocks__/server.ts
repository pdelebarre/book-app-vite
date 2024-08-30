// src/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Set up the mock server with the handlers
export const server = setupServer(...handlers);
