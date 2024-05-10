import { Grid, Paper, Skeleton, Stack } from "@optiaxiom/react";

export function App() {
  return (
    <Paper maxW="sm" p="md">
      <Stack flexDirection="horizontal">
        <Skeleton rounded="full" size="80" />

        <Stack flex="1">
          <Grid cols="3">
            <Skeleton colSpan="2" />
            <Skeleton colSpan="1" />
          </Grid>

          <Skeleton />
        </Stack>
      </Stack>
    </Paper>
  );
}
