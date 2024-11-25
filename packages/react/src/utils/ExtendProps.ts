export type ExtendProps<T1, T2> = NonNullable<T2> &
  Omit<NonNullable<T1>, keyof NonNullable<T1> & keyof NonNullable<T2>>;
