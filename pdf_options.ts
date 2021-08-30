import { PDFOptions } from 'puppeteer'

export const pdfOptions: PDFOptions = {
    format: 'A4',
    margin: {
        top: "20px",
        left: "20px",
        right: "20px",
        bottom: "20px"
    },
    printBackground: true
}
