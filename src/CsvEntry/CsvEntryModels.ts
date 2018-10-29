import {
  findNamespace,
  ItemRevisionModel,
  NamespaceModel
} from "../ItemBank/ItemBankModels";

import { validItemRevisionModel } from "@src/index";

export interface CsvRowModel extends ItemRevisionModel {
  index: number;
}

export function parseCsv(
  csvValue?: string,
  namespaces?: NamespaceModel[]
): CsvRowModel[] {
  let data: CsvRowModel[] = [];

  if (csvValue && namespaces) {
    const lines = csvValue.split("\n");
    data = parseLines(lines, namespaces);
  }

  return data;
}

export function toCsvModel(items: ItemRevisionModel[]): CsvRowModel[] {
  const csvData: CsvRowModel[] = [];
  items.forEach((item, index) => {
    if (item.itemKey) {
      csvData.push({ ...item, index });
    }
  });

  return csvData;
}

export function toCsvText(items: CsvRowModel[]): string {
  let csvString: string = "";
  items.forEach(item => {
    if (item.itemKey) {
      const itemString = item.bankKey
        ? `${item.namespace},${item.bankKey},${item.itemKey}\n`
        : `${item.namespace},${item.itemKey}\n`;
      csvString = `${csvString}${itemString}`;
    }
  });

  return csvString;
}

function parseLines(lines: string[], namespaces: NamespaceModel[]) {
  const data: CsvRowModel[] = [];
  let index = 0;

  for (const line of lines) {
    const values = line.split(",");

    const row: CsvRowModel = { index };
    // row.namespace = values[0];
    setNamespace(row, values[0], namespaces);

    if (values.length === 3) {
      setCsvRowWithBankKey(row, values);
    } else if (values.length === 2) {
      setCsvRowWithoutBankKey(row, values, namespaces);
    } else {
      continue;
    }

    row.valid = validItemRevisionModel(row);
    data.push(row);
    index = index + 1;
  }

  return data;
}

function setNamespace(
  row: CsvRowModel,
  namespace: string,
  namespaces: NamespaceModel[]
) {
  const matchedNamespace = findNamespace(namespace, namespaces);
  if (matchedNamespace) {
    row.namespace = matchedNamespace.name;
  }
}

function setCsvRowWithBankKey(row: CsvRowModel, values: string[]) {
  row.hasBankKey = true;
  row.bankKey = +values[1];
  row.itemKey = +values[2].trim();
}

function setCsvRowWithoutBankKey(
  row: CsvRowModel,
  values: string[],
  namespaces: NamespaceModel[]
) {
  row.hasBankKey = false;
  row.bankKey = getBankKeyByNamespace(row.namespace, namespaces);
  row.itemKey = +values[1].trim();
}

function getBankKeyByNamespace(
  namespace?: string,
  namespaces?: NamespaceModel[]
): number | undefined {
  let bankKey: number | undefined;

  if (namespaces) {
    if (!namespace) return;
    const matchedNamespace = findNamespace(namespace, namespaces);
    if (matchedNamespace) bankKey = matchedNamespace.bankKey;
  }

  return bankKey;
}
