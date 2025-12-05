import type { ComponentPropsWithoutRef } from "react";

import { Box, Grid } from "@optiaxiom/react";

export function App() {
  return (
    <Grid gridTemplateColumns="3" w="full">
      <DemoBox>01</DemoBox>
      <DemoBox>02</DemoBox>
      <DemoBox>03</DemoBox>
      <DemoBox bg="bg.avatar.purple" gridColumn="2">
        04
      </DemoBox>
      <DemoBox>05</DemoBox>
      <DemoBox>06</DemoBox>
      <DemoBox bg="bg.avatar.purple" gridColumn="2">
        07
      </DemoBox>
    </Grid>
  );
}

function DemoBox({ children, ...props }: ComponentPropsWithoutRef<typeof Box>) {
  return (
    <Box
      bg="bg.avatar.neutral"
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
