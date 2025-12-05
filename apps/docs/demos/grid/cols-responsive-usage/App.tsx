import type { ComponentPropsWithoutRef } from "react";

import { Box, Grid } from "@optiaxiom/react";

export function App() {
  return (
    <Grid gridTemplateColumns={["1", "2"]} w="full">
      <DemoBox>01</DemoBox>
      <DemoBox>02</DemoBox>
      <DemoBox>03</DemoBox>
      <DemoBox>04</DemoBox>
    </Grid>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      bg="bg.avatar.purple"
      display="grid"
      fontFamily="mono"
      fontSize="md"
      fontWeight="600"
      p="16"
      placeItems="center"
      rounded="sm"
      {...props}
    >
      {children}
    </Box>
  );
}
