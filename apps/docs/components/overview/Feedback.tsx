import { Skeleton } from "@optiaxiom/react";
import { Cards } from "nextra-theme-docs";

import { Card } from "./Card";

export function Feedback() {
  return (
    <Cards>
      <Card href="/components/skeleton" title="Skeleton">
        <Skeleton h="24" w="80" />
      </Card>
    </Cards>
  );
}
