import { Box, Flex, Grid, Skeleton } from "@optiaxiom/react";

export function App() {
  return (
    <Box bg="bg.default" maxW="sm" p="16" rounded="sm" shadow="sm" w="full">
      <Flex flexDirection="row">
        <Skeleton circle h="5xl" />
        <Flex flex="1">
          <Grid gridTemplateColumns="3">
            <Skeleton gridColumn="2" />
            <Skeleton gridColumn="1" />
          </Grid>
          <Skeleton />
        </Flex>
      </Flex>
    </Box>
  );
}
