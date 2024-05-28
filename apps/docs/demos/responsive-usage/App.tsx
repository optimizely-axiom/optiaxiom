import { Box, Flex, Paper, Text } from "@optiaxiom/react";
import Image from "next/image";

import beach from "./beach.jpg";

export function App() {
  return (
    <Paper maxW={["sm", "2xl"]} overflow="hidden">
      <Flex flexDirection={["column", "row"]}>
        <Box asChild>
          <Image
            alt="brown glass bottle beside white book on blue and white textile"
            src={beach}
          />
        </Box>

        <Box p="md">
          <Text
            color="fg.accent.magenta"
            fontWeight="600"
            textTransform="uppercase"
          >
            Phasellus auctor
          </Text>

          <Text fontSize="lg" fontWeight="700" my="xs">
            Nullam rhoncus gravida urna
          </Text>

          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            efficitur feugiat enim, id pretium nisl luctus et.
          </Text>
        </Box>
      </Flex>
    </Paper>
  );
}
