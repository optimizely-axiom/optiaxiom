import { Grid } from "@optiaxiom/react";

import { IconBox } from "./IconBox";

export const GridIcon = () => (
  <Grid gap="4" gridTemplateColumns="2" w="56">
    <IconBox bg="bg.accent.light" />
    <IconBox bg="bg.success.light" />
    <IconBox bg="bg.accent.light" />
    <IconBox bg="bg.success.light" />
  </Grid>
);
