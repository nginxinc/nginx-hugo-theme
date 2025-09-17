const puppeteer = require('puppeteer');
const fs = require('fs');

const PORT = 8041;
const PR_NUMBER = process.env.GITHUB_PR_NUMBER;
const OUTPUT_DIR = './lighthouse-reports';
const ENVIRONMENTS = [
  {
    title: 'pr',
    url: `https://frontdoor-test-docs.nginx.com/previews/nginx-hugo-theme/${PR_NUMBER}/`,
  },
];

const signIntoFrontDoor = async (browser, env) => {
  const page = await browser.newPage();
  try {
    await page.authenticate({
      username: process.env.FRONT_DOOR_USERNAME,
      password: process.env.FRONT_DOOR_PASSWORD,
    });
    await page.goto(env['url']);
    await page.waitForSelector('.navbar');
    console.log('Logged in...');
    await page.close();
  } catch {
    console.log('Unable to log in...');
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

(async () => {
  const browser = await puppeteer.launch({
    args: [`--remote-debugging-port=${PORT}`],
    headless: true,
  });
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  for (const env of ENVIRONMENTS) {
    if (env['title'] === 'pr') {
      await signIntoFrontDoor(browser, env);
    }
    await generateLighthouseReport(env);
  }

  browser.close();
})();
