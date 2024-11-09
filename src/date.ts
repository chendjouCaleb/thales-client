import {DateTime} from "luxon";

export  {}

declare module "luxon" {
  interface DateTime {
    moment(): String;
  }
}

DateTime.prototype.moment = function (): String {
  return this.toFormat('ff')
}
