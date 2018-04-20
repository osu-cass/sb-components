import { ItemRevisionModel } from "../ItemBank/ItemBankModels";
export interface CsvRowModel extends ItemRevisionModel {
    index: number;
}
export declare function parseCsv(csvValue?: string): CsvRowModel[];
