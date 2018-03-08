import * as moment from "moment";

export function getLongDateFormat(val: string): string {
  return moment(val).format("dddd, MMMM Do YYYY, h:mm:ss a");
}

export function getShortDateFormat(val: string): string {
  return moment(val).format("l");
}
