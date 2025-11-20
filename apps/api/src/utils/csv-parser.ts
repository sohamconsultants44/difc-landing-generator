import Papa from 'papaparse';
import { z } from 'zod';

export async function parseCSV<T>(
  filePath: string,
  schema: z.ZodSchema<T>
): Promise<T[]> {
  try {
    const response = await fetch(filePath);
    const text = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const validated = results.data.map((row) => schema.parse(row));
            resolve(validated);
          } catch (error) {
            reject(new Error(`CSV validation failed: ${error}`));
          }
        },
        error: (error: Error) => {
          reject(new Error(`CSV parsing failed: ${error.message}`));
        },
      });
    });
  } catch (error) {
    throw new Error(`Failed to read CSV file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function parseCSVFromString<T>(
  csvString: string,
  schema: z.ZodSchema<T>
): T[] {
  const results = Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  return results.data.map((row) => schema.parse(row));
}

