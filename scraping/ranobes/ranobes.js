const { launch } = require("puppeteer");

const fetchData = async () => {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://ranobes.net/novels1/1205748-the-last-orellen.html");
  //   await page.type(".devsite-search-field", "Headless Chrome");

  await page.waitForSelector(".moreless__toggle.moreless_btns");
  await page.click(".moreless__toggle.moreless_btns");

  await page.waitForSelector(
    ".moreless__full.is-active"
  );
  const grabData = await page.evaluate(() => {
    const pgdata = document.querySelector(
      ".moreless__full.is-active"
    ).innerHTML;
    return pgdata;
  });
  console.log(grabData);
  await browser.close();
};
fetchData();
