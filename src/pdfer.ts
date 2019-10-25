import { launch } from 'puppeteer'
import { promises } from 'fs'
import { puppeteerConfig } from '../config'

async function main () {
  const [, , source, destination] = process.argv
  console.log({source, destination})

  const buffer = await promises.readFile(source)

  const browser = await launch({ headless: true })
  const page = await browser.newPage()

  await page.setContent(buffer.toString())
  await page.pdf({
    ...puppeteerConfig,
    path: destination
  })

  await browser.close()


  console.log('done', destination)
}

main()