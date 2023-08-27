import {DateTime, Duration} from "luxon";

const  isToday = (date: DateTime): boolean => {
  return date.toISODate() === DateTime.local().toISODate();
}

const today = DateTime.local();
const laterToday = DateTime.local().plus( Duration.fromObject({ hours: 3 }) );
const tomorrow = DateTime.local().plus( Duration.fromObject({ day: 1 }) );

console.log(isToday(laterToday)) // False

// Whereas comparing year, month, day:

export const isSameDay = (a: DateTime, b: DateTime): boolean => {
  return a.hasSame(b, "day") && a.hasSame(b, "month") && a.hasSame(b, "year");
};
