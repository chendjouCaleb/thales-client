import {DateTime} from "luxon";

export  {}

declare module "luxon" {
  interface DateTime {
    moment(): String;
  }
}

DateTime.prototype.moment = function (): String {
  const diff = DateTime.now().diff(this, [ 'seconds']).toObject();
  const minutes = diff.seconds / 60
  const hours = minutes / 60;
  if(diff.seconds < 5) {
    return "à l'instant"
  }
  if(diff.seconds < 60) {
    return `il y'a ${diff.seconds.toFixed()} sec.`
  }

  if(minutes < 60) {
    return `il y'a ${minutes.toFixed()} min.`
  }

  if(hours < 24) {
    return this.toFormat('T')
  }

  if(hours < 48) {
    return `hier à ${this.toFormat('T')}`
  }
  return this.toFormat('ff')
}
