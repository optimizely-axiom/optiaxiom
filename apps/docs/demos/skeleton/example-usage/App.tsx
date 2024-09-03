import { Box, Flex, Grid, Skeleton } from "@optiaxiom/react";

export function App() {
  return (
    <Box bg="surface" maxW="sm" p="md" rounded="sm" shadow="sm" w="full">
      <Flex flexDirection="row">
        <Skeleton circle h="80" />
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
