const puppeteer = require('puppeteer');
const fs = require('fs');

const PORT = 8041;
const REPORT_NAME = process.env.REPORT_NAME;
const PR_NUMBER = process.env.GITHUB_PR_NUMBER;
const OUTPUT_DIR = './lighthouse-reports';

const signIntoFrontDoor = async (browser, env) => {
  const page = await browser.newPage();
  try {
    await page.authenticate({
      username: process.env.FRONT_DOOR_USERNAME,
      password: process.env.FRONT_DOOR_PASSWORD,
    });
    await page.goto(env['url']);
    await page.waitForSelector('.grid-container');
    console.log('Logged in...');
    await page.close();
  } catch (error) {
    console.log('Unable to log in or not needed...', error);
  }
};

const generateLighthouseReport = async (env) => {
  const OUTPUT_FILE = `${env['title']}-report.json`;
  const lighthouse = (await import('lighthouse')).default;
  console.log(`Running Lighthouse for ${env['title']}...`);
  const result = await lighthouse(env['url'], { port: PORT });
  fs.writeFileSync(`${OUTPUT_DIR}/${OUTPUT_FILE}`, result.report);
  console.log(`Generated report for ${env['title']}...`);
};

const launchBrowser = async () => {
  return await puppeteer.launch({
    args: [`--remote-debugging-port=${PORT}`],
    headless: true,
  });
};

(async () => {
  const browser = await launchBrowser();
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const environment = {
    title: `${REPORT_NAME}`,
    url: `https://frontdoor-test-docs.nginx.com/previews/nginx-hugo-theme/${PR_NUMBER}/`,
  };

  console.log(`Running on ${environment.url}...`);
  await signIntoFrontDoor(browser, environment);
  await generateLighthouseReport(environment);

  browser.close();
})();
