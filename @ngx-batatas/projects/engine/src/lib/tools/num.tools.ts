export function printNum(n: number): string {
  if (
    (n >= 0 && n > 9)
    || (n < 0) && n < -9
  ) return n.toString();

  if (n < 0) return ('-0' + (-1 * n));
  return '0' + n;
}
