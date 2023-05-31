export const sizeOf = (bytes: number) => {
  if (bytes == 0) {
    return "0.00 B";
  }
  const e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, e)).toFixed(2) + " " + " KMGTP".charAt(e) + "B"
  );
};

export const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string,
) =>
  array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
