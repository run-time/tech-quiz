import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // require('cypress-plugin-tab')(on);
    },
    baseUrl: 'http://localhost:3001',
  },
});