import "@testing-library/jest-dom/vitest";
import { vi, afterEach, afterAll, beforeAll } from "vitest";
import { server } from './src/test/__mocks__/server';

global.window.confirm = vi.fn(() => true);  // Ensure window.confirm returns true


// src/setupTests.ts

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared in a test.
afterEach(() => {
    server.resetHandlers(); 
      vi.clearAllMocks();


})

// Clean up after the tests are finished.
afterAll(() => server.close());
