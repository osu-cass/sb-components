import * as moment from "moment";

export function getLongDateFormat(val: string): string {
  return moment(val).format("lll");
}

export function getShortDateFormat(val: string): string {
  return moment(val).format("l");
}
