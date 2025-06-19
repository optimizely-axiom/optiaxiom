import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  // eslint-disable-next-line local/no-useless-clsx
  return clsx(inputs);
}
