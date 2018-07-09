import * as moment from "moment";

export function getLongDateFormat(val: string): string {
  return moment.utc(val).format("lll");
}

export function getShortDateFormat(val: string): string {
  return moment.utc(val).format("l");
}
