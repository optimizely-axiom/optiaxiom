export type ExtendProps<T1, T2, T3 = unknown> = Omit<
  T1,
  keyof T1 & (keyof T2 | keyof T3)
> &
  Omit<T2, keyof T2 & keyof T3> &
  T3;
