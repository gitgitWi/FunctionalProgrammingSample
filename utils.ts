export const log = data => console.log(data);

export function* range(limit: number) {
  let i = 0;
  while (limit--) yield i++;
}
