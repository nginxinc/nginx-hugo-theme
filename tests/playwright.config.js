import { defineConfig, devices } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1';
const PORT = 1313;
export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  workers: 1,
  outputDir: './test-results',
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  reporter: [['html', { open: 'never', outputFolder: './playwright-report' }]],
  use: {
    baseURL: `${BASE_URL}:${PORT}`,
    screenshots: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    // Set Geolocation to Cork, Ireland
    geolocation: { longitude: -8.486316, latitude: 51.896893 },
    permissions: ['geolocation'],
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
  ],
  webServer: {
    command: `cd ../exampleSite && sed -i.bkp 's/disable_coveo = .*/disable_coveo = false/' hugo.toml && hugo mod get && hugo --gc --config hugo.toml,hugo.test.toml && hugo serve --port ${PORT} --config hugo.toml,hugo.test.toml`,
    url: `${BASE_URL}:${PORT}`,
    stdout: 'ignore',
    reuseExistingServer: !process.env.CI,
  },
  expect: {
    toHaveScreenshot: {
      pathTemplate:
        '{testDir}/__screenshots__{/projectName}/{testFilePath}/{arg}{ext}',
      maxDiffPixels: 10,
    },
  },
});
