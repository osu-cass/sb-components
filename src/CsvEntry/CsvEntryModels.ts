import { ItemRevisionModel, NamespaceModel } from "../ItemBank/ItemBankModels";

export interface CsvRowModel extends ItemRevisionModel {
  index: number;
}

export function parseCsv(csvValue?: string, namespaces?: NamespaceModel[]): CsvRowModel[] {
  const data: CsvRowModel[] = [];

  if (csvValue) {
    const lines = csvValue.split("\n");
    let index = 0;

    for (const line of lines) {
      const values = line.split(",");

      const row: CsvRowModel = {
        index,
        namespace: values[0]
      };

      if (values.length === 4) {
        row.hasBankKey = true;
        row.bankKey = +values[1];
        row.itemKey = +values[2];
        row.section = values[3];
      } else if (values.length === 3) {
        row.hasBankKey = false;
        row.bankKey = getBankKeyByNamespace(row.namespace, namespaces);
        row.itemKey = +values[1];
        row.section = values[2];
      }

      data.push(row);
      index = index + 1;
    }
  }

  return data;
}

function getBankKeyByNamespace(namespace?: string, namespaces?: NamespaceModel[]): number | undefined {
  if (namespaces) {
    return namespaces.filter(s => s.name === namespace)[0].bankKey;
  }
}