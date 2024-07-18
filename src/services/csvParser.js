import Papa from "papaparse";

export const parseCSV = (data) => {
  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      //skipEmptyLines: true,
      complete: (results) => {
        // Check for parsing errors
        if (results.errors.length > 0) {
          reject(new Error("CSV file does not match the expected"));
        } else {
          const parsedData = results.data;
          if (parsedData.length !== 1536) {
            reject(
              new Error("CSV file not support 1536-Well Microtiter plate.")
            );
          }
          // get first row length and match with enitre CSV file
          const expectedHeaders = Object.keys(parsedData[0]);
          // Validate each row
          const isValidRows = parsedData.every((row) => {
            return (
              expectedHeaders.length === Object.keys(row).length &&
              expectedHeaders.every(
                (header) => row[header] !== undefined && row[header] !== null
              )
            );
          });
          if (!isValidRows) {
            reject(
              new Error("CSV file contains rows with missing or empty values.")
            );
          } else {
            resolve(parsedData);
          }
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
