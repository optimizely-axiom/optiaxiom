/**
 * Memoizes `build` by a string key, caching each result so expensive
 * constructions (e.g. `Intl` formatters) only happen once per key.
 */
export const memoize = <T>(build: (key: string) => T) => {
  const cache = new Map<string, T>();
  return (key: string): T => {
    if (!cache.has(key)) {
      cache.set(key, build(key));
    }
    return cache.get(key)!;
  };
};
