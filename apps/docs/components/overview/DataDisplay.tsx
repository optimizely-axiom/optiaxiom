import { Avatar } from "@optiaxiom/react";
import { Cards } from "nextra-theme-docs";

import { Card } from "./Card";

export function DataDisplay() {
  return (
    <Cards>
      <Card href="/components/avatar" title="Avatar">
        <Avatar>AX</Avatar>
      </Card>
    </Cards>
  );
}
