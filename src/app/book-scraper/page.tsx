import RunScraperButton from "@/components/RunScraperButton";
import React from "react";
import puppeteer from "puppeteer";
const cheerio = require("cheerio");
let counter = 0;
let booksArr:any [] = [];
interface PageProps {
  searchParams: any;
}
const Page: React.FC<PageProps> = ({ searchParams }) => {
  if (searchParams.runScraperButton) {
    console.log(searchParams);
    runScraper();
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <RunScraperButton />
    </div>
  );
};
export default Page;
const runScraper = async () => {
  booksArr = [];
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1300,
    height: 600,
  });
  const endpoint = "https://books.toscrape.com/";
  await page.goto(endpoint, {
    waitUntil: "domcontentloaded",
  });
  await wait(3000);
  await clickCategory(page);
  while (true) {
    await wait(3000);
  await scrapeData(page);
  await wait(3000);
  if(!await nextPageBoolean(page)) {
    break;
  }
  await wait(3000);
  await autoScroll(page);
  await wait(3000);
  await clickNext(page);
  await scrapeData(page);
  }
  console.log('Total number of books scraped:',booksArr.length);
  console.log('Done')
  await browser.close()
};

const wait = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const clickCategory = async (page: any) => {
  const catAttr = "catalogue/category/books/mystery_3/index.html";

  if (!(await page.$(`a[href='${catAttr}']`))) {
    counter++;
    if (counter < 3) {
      console.log(
        `can\'t find category selector... Running retry number:${counter}`
      );
      await wait(3000);
      await clickCategory(page);
    } else {
      console.log("Unable to find category selector... Moving on.");
    }
    return;
  }
  await page.click(`a[href='${catAttr}']`);
};

const scrapeData = async (page: any) => {
  const $ = cheerio.load(await page.content());
  if (!(await page.$("ol.row li"))) {
    counter++;
    console.log(
      `can't find the scrapeData selector... Running retry number: ${counter}`
    );
    if (counter < 3) {
      await wait(2000);
      await scrapeData(page);
    } else {
      console.log("Unable to find scrapeData selector... Moving on.");
      counter = 0;
    }
    return;
  }
  const liTags = $("ol.row li");
  const baseUrl = "http://books.toscrape.com/";
  liTags.each((i: any, el: any) => {
    let imageUrl = $(el).find("img").attr("src");
    imageUrl = imageUrl.replaceAll("../", "").trim();
    imageUrl = baseUrl + imageUrl;
    let starRating = $(el).find("p.star-rating").attr("class");
    starRating = starRating.replace("star-rating", "").trim();
    const title = $(el).find("h3").text().trim();
    const price = $(el).find("p.price_color").text().trim();
    const availability = $(el).find("p.instock.availability").text().trim();
    const book = { imageUrl, starRating, title, price, availability };
    booksArr.push(book); // Use push method to add elements to the array
    console.log({ imageUrl }, " - ", { starRating });
  });
  counter = 0;
  console.log(booksArr)
};

const autoScroll = async (page: any) => {
  await wait(2000);
  const selector = "li.next";
  if(!await page.$(selector)) {
    await wait(2000);
    if (counter < 3) {
      counter++;
      console.log(`can't find the scrapeData selector... Running retry number: ${counter}`);
      await autoScroll(page);
      } else {
        counter = 0;
        console.log("Unable to find scrapeData selector... Moving on.");
     }
      return;
    }

    
    counter = 0;
    await page.evaluate((selector:any) => {
      const element = document.querySelector(selector);
      element.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, selector)
  }


  const clickNext = async (page: any) => {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click('li.next'),
    ]);
  };
  

  const nextPageBoolean = async (page:any) =>{
    const $= cheerio.load(page.content())
    if(!await page.$('li.next')) {
      await wait(2000);
      if (counter < 3) {
        counter++;
        console.log(`can't find the scrapeData selector... Running retry number: ${counter}`);
        await autoScroll(page);
        } else {
          counter = 0;
          console.log("Unable to find scrapeData selector... Moving on.");
       }
        return;
      }
      return true;
  }