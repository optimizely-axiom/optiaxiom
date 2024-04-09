import { Box, theme } from "@optiaxiom/react";

export function App() {
  return (
    <Box
      background={{ dark: "brand.600", light: "brand.50" }}
      borderRadius="sm"
      margin="lg"
      padding="lg"
      style={{
        border: `1px solid ${theme.color["brand.200"]}`,
        padding: theme.space.md,
      }}
    >
      This is a Box
    </Box>
  );
}
