# Setup

`npm i`

# Usage

`npm run pdf -- path/to/source path/to/destination`

or

`node PATH/TO/PDFER/node_modules/ts-node/dist/bin.js PATH/TO/PDFER/src/pdfer.ts PATH/TO/SOURCE PATH/TO/DESTINATION`

# Config

`./config.ts` exports `puppeteerConfig` object of `PDFOptions` type, thats the same as `page.pdf([options])`

See Puppeteer [docs](https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagepdfoptions)

