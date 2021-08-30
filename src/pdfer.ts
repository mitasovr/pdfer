import puppeteer from 'puppeteer'
import fs from 'fs';
import path from "path";

import { pdfOptions } from '../pdf_options'


// disable logging
// console.log = function() {}
console.log("Running pdfer.ts with arguments:", process.argv.slice(2));


const RE_HtmlFileName = /^.*\.(html|htm)$/ig
const RE_FileExtension = /\.[^/.]+$/
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


async function convert (source: string) {
  let page = await browser.newPage()
  let destination = source.replace(RE_FileExtension, ".pdf")

  await page.goto(`file://${source}`);
  await page.pdf({
    ...pdfOptions,
    path: destination
  })

  await page.close()
}


async function processDirectory(source: string) {
  console.log(`Converting all html files in "${source}":`)
  const dirContent = await fs.promises.opendir(source)

  for await (const dirent of dirContent) {
    if ( dirent.name.match(RE_HtmlFileName) ) {
      console.log(`* Converting ${dirent.name}`)
      await convert(path.join(source, dirent.name))
    }
  }
}

async function main () {
  const [, , source] = process.argv
  console.log({source})

  if ( ! fs.existsSync(source) ) {
    console.error("Source folder/file is not exists")
    process.exit(1)
  }

  await init()

  if (fs.lstatSync(source).isDirectory()) {
    await processDirectory(source)
  } else {
    console.log(`Converting single html file: ${source}`)
    await convert(source)
  }

  await finalize()
}

main()
