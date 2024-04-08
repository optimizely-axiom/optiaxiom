export const mapValues = <
  V,
  K extends KResult,
  VResult,
  KResult extends PropertyKey,
>(
  obj: Record<K, V>,
  valueFn: (value: V, key: K) => VResult,
  keyFn: (key: K) => KResult = (key) => key,
) => {
  const result = {} as Record<KResult, VResult>;
  for (const [key, value] of Object.entries<V>(obj)) {
    result[keyFn ? keyFn(key as K) : (key as K)] = valueFn(value, key as K);
  }
  return result;
};
