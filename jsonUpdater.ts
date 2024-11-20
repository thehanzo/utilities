import * as fs from "fs";

/**
 * This function receives a string of a JSON object and saves it to path
 * @param path
 * @param json
 */
export function updateJsonFile(json: string, path: string) {
  return fs.writeFile(path, json, function (err) {
    if (err) throw err;
    console.log("complete");
  });
}
