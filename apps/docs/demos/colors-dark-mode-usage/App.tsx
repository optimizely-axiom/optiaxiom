import { Box } from "@optiaxiom/react";

export function App() {
  return (
    <Box
      background={{ base: "blue.50", dark: "blue.900" }}
      color={{ base: "blue.600", dark: "blue.50" }}
      padding="md"
    >
      Setting dark and light mode colors
    </Box>
  );
}
