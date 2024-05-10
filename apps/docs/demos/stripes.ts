import { theme } from "@optiaxiom/react";

export const greenStripes = {
  backgroundColor: `oklch(from ${theme.colors["green.500"]} l c h / 80%)`,
  backgroundImage:
    "linear-gradient(135deg, #fff6 10%, #0000 0, #0000 50%, #fff6 0, #fff6 60%, #0000 0, #0000)",
  backgroundSize: "9px 9px",
};

const yellowStripeColor = `color-mix(in srgb, ${theme.colors["orange.500"]} 50%, transparent)`;
export const yellowStripes = {
  backgroundColor: `oklch(from ${theme.colors["yellow.500"]} calc(l - 0.1) c h / 20%)`,
  backgroundImage: `linear-gradient(135deg, ${yellowStripeColor} 10%, #0000 0, #0000 50%, ${yellowStripeColor} 0, ${yellowStripeColor} 60%, #0000 0, #0000)`,
  backgroundSize: "7px 7px",
};
