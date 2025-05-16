import { Button, Flex } from "@optiaxiom/react";
import {
  Card,
  CardAction,
  CardCheckbox,
  CardHeader,
  CardOverlay,
  CardPreview,
} from "@optiaxiom/react/unstable";
import { IconMusic, IconStar } from "@tabler/icons-react";

export function App() {
  return (
    <Flex flexDirection={["column", "row"]}>
      <Card size="224">
        <CardPreview bg="bg.success.subtle" color="fg.success" flex="1">
          <IconMusic size="32" />
          <CardOverlay>
            <CardAction>
              <CardCheckbox />
            </CardAction>
          </CardOverlay>
        </CardPreview>
        <CardHeader>Checkbox</CardHeader>
      </Card>
      <Card size="224">
        <CardPreview bg="bg.success.subtle" color="fg.success" flex="1">
          <IconMusic size="32" />
          <CardOverlay>
            <CardAction>
              <CardCheckbox />
              <Button appearance="subtle" icon={<IconStar />} />
            </CardAction>
          </CardOverlay>
        </CardPreview>
        <CardHeader>Checkbox and star button</CardHeader>
      </Card>
    </Flex>
  );
}
