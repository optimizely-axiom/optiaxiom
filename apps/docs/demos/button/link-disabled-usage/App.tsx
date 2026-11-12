import { Button, Group, Link, Text } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="8">
      <Button asChild disabled>
        <Link href="./props">View report</Link>
      </Button>
      <Text color="fg.secondary" fontSize="sm">
        The report is ready once the import finishes.
      </Text>
    </Group>
  );
}
