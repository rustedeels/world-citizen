import { printNum } from './num.tools';

export function getDateString(d: Date): `${number}-${number}-${number}` {
  return `${d.getFullYear()}-${printNum(d.getMonth() + 1)}-${printNum(d.getDate())}` as any;
}

export function getDate(date: `${number}-${number}-${number}`): Date {
  const d = date.split('-').map(e => parseInt(e, 10));
  return new Date(d[0], d[1] - 1, d[2]);
}
