import {
  Box,
  Card,
  CardHeader,
  CardLink,
  Text,
  Tooltip,
} from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="xs" w="full">
      <Card>
        <CardHeader>
          <Tooltip
            auto
            content="Step by step: How to brainstorm a creative marketing campaign (+ free template)"
          >
            <CardLink href="../">
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
