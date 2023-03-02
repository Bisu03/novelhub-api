const { launch } = require("puppeteer");

const fetchData = async () => {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.wuxiaworld.com/novel/rankers-return");

  
  const grabData = await page.evaluate(() => {
    const pgdata = document.querySelector(
      "#loading-container-replacement > div > div.bg-gray-100.bg-\\[url\\(\\'\\/images\\/Noise\\@3x\\.jpg\\'\\)\\].bg-\\[length\\:160px\\].dark\\:bg-gray-900.dark\\:bg-\\[url\\(\\'\\/images\\/Noise-dark\\@3x\\.jpg\\'\\)\\].ww-1hku80h > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-item.MuiGrid-direction-xs-column.pt-\\[8px\\].sm2\\:pt-0.ww-3jzz7a > div.flex.flex-col.items-start > div.sm2\\:mt-\\[2px\\] > h1"
    ).innerText;
    return pgdata;
  });
  console.log(grabData);
  await browser.close();
};
fetchData();
