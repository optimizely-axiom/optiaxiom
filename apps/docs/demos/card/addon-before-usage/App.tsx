import { IconFolder } from "@optiaxiom/icons";
import { Box, Card, CardHeader } from "@optiaxiom/react";

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
