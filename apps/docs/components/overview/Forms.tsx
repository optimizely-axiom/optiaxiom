import { Box, Button } from "@optiaxiom/react";
import { Cards } from "nextra-theme-docs";

import { Card } from "./Card";

export function Forms() {
  return (
    <Cards>
      <Card href="/components/button" title="Button">
        <Button>
          <Box bg="bg.neutral" h="6" rounded="sm" w="64" />
        </Button>
      </Card>
    </Cards>
  );
}
