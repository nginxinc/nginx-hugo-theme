import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1';
const PORT = 1313;
export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  workers: 1,
  outputDir: './test-results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  reporter: [['html', { outputFolder: './playwright-report' }]],
  use: {
    baseURL: `${BASE_URL}:${PORT}`,
    screenshots: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    timezoneId: 'America/Los_Angeles',
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: `cd ../exampleSite && hugo mod get && hugo --gc -e production && hugo serve --port ${PORT}`,
    url: `${BASE_URL}:${PORT}`,
    stdout: 'ignore',
  },
  expect: {
    toHaveScreenshot: {
      pathTemplate:
        '{testDir}/__screenshots__{/projectName}/{testFilePath}/{arg}{ext}',
      maxDiffPixels: 10,
    },
  },
});
