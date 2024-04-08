import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box
      background={{ dark: "blue.600", light: "blue.50" }}
      color={{ dark: "blue.50", light: "blue.600" }}
      padding="md"
    >
      Setting dark and light mode colors
    </Box>
  );
}
