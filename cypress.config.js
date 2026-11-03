const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const dotenv = require('cypress-dotenv');

module.exports = defineConfig({
  e2e: {
    video: true,
    videosFolder: "cypress/videos",
    specPattern: '**/*.feature',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));

      const envName = config.env.environment || "qa";
      
      config = dotenv(config, { path: `.env.${envName}` });

      config.baseUrl = process.env.BASE_URL;
      config.env.VALID_USERNAME = process.env.VALID_USERNAME;
      config.env.VALID_PASSWORD = process.env.VALID_PASSWORD;

      return config;
    },
    supportFile: 'cypress/support/e2e.js',
  },
  viewportWidth: 1920,
  viewportHeight: 1080
});
