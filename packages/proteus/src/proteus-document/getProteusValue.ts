import { get } from "jsonpointer";

import type { ProteusValue } from "./schemas";

export function getProteusValue(
  data: Record<string, unknown>,
  element: Pick<ProteusValue, "formatter" | "path">,
  parentPath: string,
) {
  try {
    const value = get(
      data,
      element.path.startsWith("/")
        ? element.path
        : element.path
          ? `${parentPath}/${element.path}`
          : parentPath,
    );
    if (element.formatter) {
      return applyFormatter(value, element.formatter);
    }
    return value;
  } catch {
    // TODO: throw error if `strict` true
    // if (process.env.NODE_ENV !== "production") {
    //   console.error(
    //     `[optiaxiom][react][useProteusValue] Invalid path "${element.path}":`,
    //     error,
    //   );
    // }
    return null;
  }
}

const formatters: Record<
  string,
  (value: unknown, options?: Record<string, unknown>) => unknown
> = {
  DateTime: (value, options) => {
    if (typeof value === "number" || typeof value === "string") {
      return new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "short",
        ...options,
      }).format(new Date(value));
    }
    return value;
  },
  Number: (value, options) => {
    const num =
      typeof value === "number"
        ? value
        : typeof value === "string" && value !== ""
          ? Number(value)
          : NaN;
    if (!Number.isNaN(num)) {
      return new Intl.NumberFormat(undefined, options).format(num);
    }
    return value;
  },
};

export function applyFormatter(
  value: unknown,
  formatter: string | { options?: Record<string, unknown>; type: string },
): unknown {
  const key = typeof formatter === "string" ? formatter : formatter.type;
  const fn = formatters[key];
  if (!fn) {
    return value;
  }
  const options = typeof formatter === "string" ? undefined : formatter.options;
  if (Array.isArray(value)) {
    return value.map((v) => fn(v, options));
  }
  return fn(value, options);
}
