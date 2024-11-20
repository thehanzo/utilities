import * as fs from "fs";
import { parse } from "csv-parse/sync";

export async function getRecordsFromCSVFile(dataFilepath: string) {
  const records = parse(fs.readFileSync(dataFilepath), {
    relax_column_count: true,
    columns: true,
    skip_empty_lines: true,
  });
  return await records;
}
