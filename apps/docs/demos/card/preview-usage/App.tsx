import { IconMusic } from "@optiaxiom/icons";
import { Card, CardHeader, CardPreview } from "@optiaxiom/react";

export function App() {
  return (
    <Card size="224">
      <CardPreview bg="bg.success" color="fg.default.inverse" flex="1">
        <IconMusic size="32" />
      </CardPreview>
      <CardHeader>The majestic world of turtles</CardHeader>
    </Card>
  );
}
