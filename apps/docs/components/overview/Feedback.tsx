import { Progress, Skeleton } from "@optiaxiom/react";
import { Cards } from "nextra-theme-docs";

import { Card } from "./Card";

export function Feedback() {
  return (
    <Cards>
      <Card flex="1" href="/components/progress" mx="32" title="Progress">
        <Progress value={50} />
      </Card>
      <Card href="/components/skeleton" title="Skeleton">
        <Skeleton h="24" w="80" />
      </Card>
    </Cards>
  );
}
