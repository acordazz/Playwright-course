import { defineConfig, devices, expect } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


// this is an example of a custom expect
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => "passed",
        pass: true,
      };
    } else {
      return {
        message: () => "failed",
        pass: false,
      };
    }
  },
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  // // Glob patterns or regular expressions to ignore test files.
  // testIgnore: '*test-assets',

  // // Glob patterns or regular expressions that match test files.
  // testMatch: '*todo-tests/*.spec.ts',

  // // Folder for test artifacts such as screenshots, videos, traces, etc.
  // outputDir: 'test-results',

  // // path to the global setup files.
  // globalSetup: require.resolve('./global-setup'),

  // // path to the global teardown files.
  // globalTeardown: require.resolve('./global-teardown'),

  // // Each test is given 30 seconds.
  // timeout: 30000,
  // expect: {
  //   // Maximum time expect() should wait for the condition to be met.
  //   timeout: 5000,

  //   toHaveScreenshot: {
  //     // An acceptable amount of pixels that could be different, unset by default.
  //     maxDiffPixels: 10,
  //   },

  //   toMatchSnapshot:  {
  //     // An acceptable ratio of pixels that are different to the total amount of pixels, between 0 and 1.
  //     maxDiffPixelRatio: 10,
  //   },
  // },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    storageState: "playwright/.auth/user.json",
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "setup",
    //   testMatch: "auth.setup.ts", // uncomment this project if you want to use the authentication setup
    // },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      // dependencies: ["setup"], // uncomment this row if you want to use the authentication setup at this project
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    // watch for the dependency here
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
      // dependencies: ['setup'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },

    /* have different environments, each on a project */
    {
      name: "staging",
      use: {
        baseURL: "staging.example.com",
      },
      retries: 2,
    },
    {
      name: "production",
      use: {
        baseURL: "production.example.com",
      },
      retries: 0,
    },

    /* splitting tests into projects: filter by matching or ignoring file names */
    {
      name: "Smoke",
      testMatch: /.*smoke.spec.ts/,
      retries: 0,
    },
    {
      name: "Default",
      testIgnore: /.*smoke.spec.ts/,
      retries: 2,
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
