import { Paper, Stack, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Stack>
      <Paper elevation="sm" padding="md">
        <Text>This is a paper</Text>
      </Paper>

      <Paper elevation="md" padding="md">
        <Text>This is a paper</Text>
      </Paper>

      <Paper elevation="lg" padding="md">
        <Text>This is a paper</Text>
      </Paper>
    </Stack>
  );
}
