import { Box } from "@optiaxiom/react";
import { Card, CardHeader } from "@optiaxiom/react/unstable";
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
