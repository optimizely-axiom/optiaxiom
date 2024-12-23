export type ExcludeProps<P, T extends keyof P> = Omit<P, T>;
