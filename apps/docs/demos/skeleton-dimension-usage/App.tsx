import { Grid, Heading, Skeleton, Stack, Text } from "@optiaxiom/react";

function Demo({ loading }: { loading?: boolean }) {
  return (
    <Stack>
      <Heading>{loading ? <Skeleton /> : "h1"}</Heading>
      <Heading size="h3">{loading ? <Skeleton /> : "h3"}</Heading>
      <Text>{loading ? <Skeleton /> : "body"}</Text>
    </Stack>
  );
}

export function App() {
  return (
    <Grid cols={2}>
      <Demo loading />
      <Demo />
    </Grid>
  );
}
