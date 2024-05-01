import { Box, Paper, Stack, Text } from "@optiaxiom/react";
import Image from "next/image";

import beach from "./beach.jpg";

export function App() {
  return (
    <Paper borderRadius="md" maxWidth={["sm", "2xl"]} overflow="hidden">
      <Stack flexDirection={["vertical", "horizontal"]}>
        <Box>
          <Image
            alt="brown glass bottle beside white book on blue and white textile"
            src={beach}
          />
        </Box>

        <Box padding="md">
          <Text color="magenta.600" fontWeight="600" textTransform="uppercase">
            Phasellus auctor
          </Text>

          <Text fontSize="lg" fontWeight="700" marginY="xs">
            Nullam rhoncus gravida urna
          </Text>

          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            efficitur feugiat enim, id pretium nisl luctus et.
          </Text>
        </Box>
      </Stack>
    </Paper>
  );
}
