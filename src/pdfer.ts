import puppeteer from 'puppeteer'

import { pdfOptions } from '../pdf_options'


// disable logging
console.log = function() {}
console.log("Running pdfer.ts with arguments:", process.argv.slice(2));


let browser: puppeteer.Browser


async function init() {
  browser = await puppeteer.launch({
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage'
    ]
  })

  const browserVersion = await browser.version()
  console.log(`Started ${browserVersion}`)
}


async function finalize() {
  await browser.close()
}

async function convert (source: string, destination: string) {
  let page = await browser.newPage()

  await page.goto(`file://${source}`);
  await page.pdf({
    ...pdfOptions,
    path: destination
  })

  await page.close()
}


async function main () {
  const [, , source, destination] = process.argv
  console.log({source, destination})

  await init()
  await convert(source, destination)
  await finalize()
}

main()
