import { Flex, Grid, Paper, Skeleton } from "@optiaxiom/react";

export function App() {
  return (
    <Paper maxW="sm" p="md">
      <Flex flexDirection="row">
        <Skeleton circle h="80" />
        <Flex flex="1">
          <Grid cols="3">
            <Skeleton colSpan="2" />
            <Skeleton colSpan="1" />
          </Grid>
          <Skeleton />
        </Flex>
      </Flex>
    </Paper>
  );
}
