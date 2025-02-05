export const toCamelCase = (str: string) =>
  str.startsWith("aria-") || str.startsWith("data-")
    ? str
    : str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
