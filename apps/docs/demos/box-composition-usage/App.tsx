import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box
      asChild
      background={{ dark: "brand.600", light: "brand.50" }}
      borderRadius="md"
      padding="xs"
    >
      <span>I am a span</span>
    </Box>
  );
}
