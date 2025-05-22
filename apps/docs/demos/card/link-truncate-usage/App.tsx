import { Box, Text, Tooltip } from "@optiaxiom/react";
import { Card, CardHeader, CardLink } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Box maxW="xs" w="full">
      <Card>
        <CardHeader>
          <Tooltip
            auto
            content="Step by step: How to brainstorm a creative marketing campaign (+ free template)"
          >
            <CardLink href="#usage">
              <Text lineClamp="1">
                Step by step: How to brainstorm a creative marketing campaign (+
                free template)
              </Text>
            </CardLink>
          </Tooltip>
        </CardHeader>
      </Card>
    </Box>
  );
}
