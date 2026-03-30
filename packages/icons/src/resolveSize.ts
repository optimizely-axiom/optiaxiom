const sizes: Record<string, string> = {
  "2xs": "1rem",
  xs: "1.25rem",
  sm: "1.5rem",
  md: "2rem",
  lg: "2.5rem",
  xl: "3rem",
  "3xl": "5rem",
};

export function resolveSize(size: number | string) {
  return typeof size === "string" && size in sizes ? sizes[size] : size;
}
