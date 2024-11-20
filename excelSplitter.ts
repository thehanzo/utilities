const XLSX = require('xlsx');
const path = require('path');

/**
This function receives an excel file and splits it into files of the defined lines per file. Optionally saved as a CSV
@param filePath
@param outputFile
@param linesPerFile
@param saveAsCsv
*/
function splitExcelFile(filePath: string, outputFile: string, linesPerFile = 50, saveAsCsv = false) {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON format (array of arrays)
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Extract the header row and the data rows
    const header = jsonData[0];
    const data = jsonData.slice(1); // All rows except the header

    // Calculate the number of files needed
    const totalFiles = Math.ceil(data.length / linesPerFile);

    // Loop through and create new Excel files
    for (let i = 0; i < totalFiles; i++) {
        // Slice the data for the current file
        const start = i * linesPerFile;
        const end = start + linesPerFile;
        const currentData = data.slice(start, end);

        // Combine the header with the current data
        const newSheetData = [header, ...currentData];

        // Create a new worksheet and workbook
        const newWorksheet = XLSX.utils.aoa_to_sheet(newSheetData);
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);

        // Write the new workbook to a file
        if(saveAsCsv === true) XLSX.utils.sheet_to_csv(newWorkbook);
        const newFileName = path.join(__dirname, `/excel/${outputFile}${i + 1}${saveAsCsv? ".csv": ".xlsx"}`)
        XLSX.writeFile(newWorkbook, newFileName);
        console.log(`Created file: ${newFileName}`);
    }
}


/**
 * Convert excel file
 * run: node utilities/excelSplitter.ts
 */
// const inputFilePath = path.join(__dirname, '/excel/2023_Dealer_List.xlsx');
// splitExcelFile(inputFilePath, 'Toyota_Dealer_List', 40, true);