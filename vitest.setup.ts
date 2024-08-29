import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { vi, afterEach } from "vitest";

global.window.confirm = vi.fn(() => true);  // Ensure window.confirm returns true


afterEach(() => {
  cleanup();
});
