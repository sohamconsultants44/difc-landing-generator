import * as XLSX from 'xlsx';
import { z } from 'zod';

export async function parseExcelFile<T>(
  filePath: string,
  schema: z.ZodSchema<T>,
  sheetName?: string
): Promise<T[]> {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = sheetName 
      ? workbook.Sheets[sheetName] 
      : workbook.Sheets[workbook.SheetNames[0]];
    
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    
    return jsonData.map((row) => schema.parse(row));
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function getSheetNames(filePath: string): string[] {
  try {
    const workbook = XLSX.readFile(filePath);
    return workbook.SheetNames;
  } catch (error) {
    throw new Error(`Failed to read Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

