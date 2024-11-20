import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { parse } from 'papaparse';

async function pdfToCSV(pdfPath: string, csvPath: string): Promise<void> {
  // Read the PDF file
  const pdfBytes = await fs.promises.readFile(pdfPath);

  // Load the PDF document
  const pdf = await PDFDocument.load(pdfBytes);

  // Extract the text from each page of the PDF
  const pages = await pdf.getPages();
  const text = (await Promise.all(pages.map(async (page) => await page.getText()))).join('\n');

  // Split the text into rows
  const rows = text.split('\n');

  // Parse the rows into a CSV format
  const csv = parse(rows, {
    download: false,
    header: false,
    newline: '\n',
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ',',
  });

  // Write the CSV data to a file
  await fs.promises.writeFile(csvPath, csv.data.join('\n'));

  console.log(`PDF file converted to CSV: ${csvPath}`);
}

// Example usage
pdfToCSV('path/to/input.pdf', 'path/to/output.csv');