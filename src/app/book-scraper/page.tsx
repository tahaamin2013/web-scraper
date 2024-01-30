import RunScraperButton from '@/components/RunScraperButton';
import React from 'react';
import puppeteer from 'puppeteer';
const cheerio = require('cheerio')
let counter  =  0;
interface PageProps {
  searchParams:any
}
const Page: React.FC<PageProps> = ({ searchParams }) => {
  if (searchParams.runScraperButton) {
    console.log(searchParams);
    runScraper();
  }
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24'><RunScraperButton /></div>
  );
};
export default Page;
const runScraper = async () => {
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

  await wait(1000);

  await clickCategory(page)
};

const wait = (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const clickCategory = async (page:any) => {
  const catAttr = 'catalogue/category/books/mystery_3/index.html'

  if (!await page.$(`a[href='${catAttr}']`)) {
    counter++;
    if(counter < 3) {
    console.log(`can\'t find category selector... Running retry number:${counter}`);
    await wait(1000)
    await clickCategory(page)
  } else {
    console.log(('Unable to find category selector... Moving on.'));
  }
  return;
  }
  await page.click(`a[href='${catAttr}']`);
} 

const scrapeData = async (page :any) => {
  const $ = cheerio.load(await page.content());
  if(!await page.$('ol.row li')) {
    counter++;
    console.log(`can't find the scrapeData selector... Running retry number: ${counter}`)
  if(counter < 3) {
    await wait(2000);
    await scrapeData(page);
  }else {
    console.log('Unable to find scrapeData selector... Moving on.');
    counter = 0;
  }
  return;
}

 const liTags = $('ol.row li');

 liTags.each((i:any, el:any) =>{
  const imageUrl = $(el).find('img').attr('src');
  console.log({imageUrl});
 })
}