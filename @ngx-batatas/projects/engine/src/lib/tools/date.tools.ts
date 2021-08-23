import { printNum } from './num.tools';

export function getDateString(d: Date): `${number}-${number}-${number}` {
  return `${d.getFullYear()}-${printNum(d.getMonth() + 1)}-${printNum(d.getDate())}` as any;
}

export function getTimeString(d: Date): `${number}:${number}:${number}` {
  return `${printNum(d.getHours())}-${printNum(d.getMinutes())}-${printNum(d.getSeconds())}` as any;
}

export function getDateTimeString(d: Date): string {
  const date = getDateString(d);
  const time = getTimeString(d);
  return `${date} ${time}`;
}

export function getDate(date: `${number}-${number}-${number}`): Date {
  const d = date.split('-').map(e => parseInt(e, 10));
  return new Date(d[0], d[1] - 1, d[2]);
}

export function getDateTime(dateTime: string): Date {
  const [date, time] = dateTime.split(' ');
  if (!date || !time) throw new Error('Date is invalid');
  const [hour, min, sec] = time.split(':').map(e => parseInt(e, 10));
  const [year, month, day] = date.split('-').map(e => parseInt(e, 10));
  return new Date(year, month + 1, day, hour, min, sec);
}
