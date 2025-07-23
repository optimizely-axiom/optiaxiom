import { Box, Card, CardHeader } from "@optiaxiom/react";
import { IconFolder } from "@tabler/icons-react";

export function App() {
  return (
    <Box maxW="sm" w="full">
      <Card>
        <CardHeader addonBefore={<IconFolder />}>
          The majestic world of turtles
        </CardHeader>
      </Card>
    </Box>
  );
}
