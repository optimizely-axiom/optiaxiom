import { Flex, Paper, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Flex>
      <Paper elevation="sm" p="md">
        <Text>This is a paper</Text>
      </Paper>

      <Paper elevation="md" p="md">
        <Text>This is a paper</Text>
      </Paper>

      <Paper elevation="lg" p="md">
        <Text>This is a paper</Text>
      </Paper>
    </Flex>
  );
}
