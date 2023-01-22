import { launch } from "puppeteer";

const fetchData = async () => {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.wuxiaworld.com/novel/the-novels-extra");
  //   await page.type(".devsite-search-field", "Headless Chrome");
  const grabData = await page.evaluate(() => {
    const pgdata = document.querySelector("h1.font-set-b24 text-gray-t1 line-clamp-2 sm2:font-set-b32").innerText;
    return pgdata;
  });
  console.log(grabData);
  await browser.close();
};
fetchData();
