export const isHoverSupported =
  typeof window !== "undefined" &&
  typeof window.matchMedia !== "undefined" &&
  window.matchMedia("(hover: hover)").matches;
