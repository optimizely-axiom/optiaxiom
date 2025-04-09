export const isHoverSupported =
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
