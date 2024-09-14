/**
 * Like [lodash.memoize](https://lodash.com/docs/4.17.15#memoize)
 */
export function memoize<Arg, Res>(fn: (arg: Arg) => Res): (arg: Arg) => Res {
  const cache = new Map<Arg, Res>(); // memory leak
  return (arg: Arg) => {
    if (cache.has(arg)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}
