import {
  findNamespace,
  ItemRevisionModel,
  NamespaceModel
} from "../ItemBank/ItemBankModels";

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

function parseLines(lines: string[], namespaces: NamespaceModel[]) {
  const data: CsvRowModel[] = [];
  let index = 0;

  for (const line of lines) {
    const values = line.split(",");

    const row: CsvRowModel = { index };
    // row.namespace = values[0];
    setNamespace(row, values[0], namespaces);

    if (values.length === 4) {
      setCsvRowWithBankKey(row, values);
    } else if (values.length === 3) {
      setCsvRowWithoutBankKey(row, values, namespaces);
    } else {
      continue;
    }

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
  row.itemKey = +values[2];
  row.section = values[3].trim();
}

function setCsvRowWithoutBankKey(
  row: CsvRowModel,
  values: string[],
  namespaces: NamespaceModel[]
) {
  row.hasBankKey = false;
  row.bankKey = getBankKeyByNamespace(row.namespace, namespaces);
  row.itemKey = +values[1];
  row.section = values[2].trim();
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
