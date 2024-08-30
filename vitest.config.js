import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    reporters: [["vitest-sonar-reporter", { outputFile: "sonar-report.xml" }]],

    coverage: {
      reporters: "lcov",
    },
  },
});
