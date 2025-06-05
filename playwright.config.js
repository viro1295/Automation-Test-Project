const config = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    browserName: 'chromium',
    headless: true,
    //screenshot: 'only-on-failure',
    screenshot: 'on',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx serve -p 3000', 
    url: 'http://localhost:3000', 
    timeout: 120000, 
    reuseExistingServer: !process.env.CI, 
  },
};

module.exports = config;