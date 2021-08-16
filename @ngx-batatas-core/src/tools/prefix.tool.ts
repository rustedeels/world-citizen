export const prefix = (val: string, prefix: string) => `${prefix}=>${val}`;

export const isPrefix = (val: string) => val.indexOf('=>') > 0;

export const splitPrefix = (val: string): [string, string | undefined] => {
  const split = val.split('=>');
  if (split.length === 1) return [split[0], undefined];
  if (split.length === 2) return [split[1], split[0]];
  
  throw new Error ('Invalid entry, cannot split in two');
}
