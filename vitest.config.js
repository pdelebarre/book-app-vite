import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  plugins: [
    createReporter({
      reporters: ["lcov", "text"],
    }),
  ],
});
