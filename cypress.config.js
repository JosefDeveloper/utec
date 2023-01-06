const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,

  e2e: {
    baseUrl: 'https://app.utec.edu.pe',

    setupNodeEvents(on, config) {
      return {
        browsers: config.browsers.filter(
          (b) => b.family === "chromium" && b.name !== "electron"
        ),
      };
    },
  },
});
