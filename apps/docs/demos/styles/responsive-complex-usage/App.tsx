import { Box, Flex, Text } from "@optiaxiom/react";
import Image from "next/image";

import beach from "@/demos/beach.jpg";

export function App() {
  return (
    <Box
      bg="bg.default"
      m="4"
      maxW={["sm", "lg"]}
      overflow="hidden"
      rounded="sm"
      shadow="sm"
    >
      <Flex alignItems="start" flexDirection={["column", "row"]} gap="0">
        <Box asChild h="auto" maxW="full">
          <Image
            alt="brown glass bottle beside white book on blue and white textile"
            src={beach}
            style={{ minWidth: "0" }}
          />
        </Box>

        <Box p="16">
          <Text color="fg.error" fontWeight="600" textTransform="uppercase">
            Phasellus auctor
          </Text>

          <Text fontSize="lg" fontWeight="700" my="8">
            Nullam rhoncus gravida urna
          </Text>

          <Text>
            Lorem ipsum dolor sit amet conse ctetur adipiscing elit. Phasellus
            efficitur feugiat luctus et.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
