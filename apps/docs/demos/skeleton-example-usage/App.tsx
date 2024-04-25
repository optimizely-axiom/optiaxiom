import { Grid, Paper, Skeleton, Stack } from "@optiaxiom/react";

export function App() {
  return (
    <Paper maxWidth="sm" padding="md">
      <Stack direction="horizontal">
        <Skeleton borderRadius="full" size={10} />

        <Stack flex={1}>
          <Grid cols={3}>
            <Skeleton colSpan={2} />
            <Skeleton colSpan={1} />
          </Grid>

          <Skeleton />
        </Stack>
      </Stack>
    </Paper>
  );
}
