import { ItemRevisionModel } from "../ItemBank/ItemBankModels";

export interface CsvRowModel extends ItemRevisionModel {
  index: number;
}

export function parseCsv(csvValue: string | undefined) {
  const data: CsvRowModel[] = [];

  if (csvValue) {
    const lines = csvValue.split("\n");
    let index = 0;

    for (const line of lines) {
      const values = line.split(",");

      const row: CsvRowModel = {
        index,
        itemKey: +values[1],
        bankKey: +values[0],
        section: values[2]
      };

      data.push(row);
      index = index + 1;
    }
  }

  return data;
}
