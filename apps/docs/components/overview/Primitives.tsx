import { Box } from "@optiaxiom/react";
import { Cards } from "nextra/components";

import { Card } from "./Card";

export function Primitives() {
  return (
    <Cards>
      <Card href="/components/box" title="Box">
        <Box bg="bg.neutral" h="40" rounded="sm" w="64" />
      </Card>
    </Cards>
  );
}
