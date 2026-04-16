import {
  IconAddComment,
  IconAtr,
  IconImagesmode,
  IconNorth,
} from "@optiaxiom/icons";
import { Button, Group, Textarea, Tooltip } from "@optiaxiom/react";

export function App() {
  return (
    <Textarea
      addonAfter={
        <Group borderT="1" gap="4" p="4">
          <Tooltip content="Add emoji">
            <Button appearance="subtle" icon={<IconAddComment />} size="sm" />
          </Tooltip>
          <Tooltip content="Add mention">
            <Button appearance="subtle" icon={<IconAtr />} size="sm" />
          </Tooltip>
          <Tooltip content="Upload images">
            <Button appearance="subtle" icon={<IconImagesmode />} size="sm" />
          </Tooltip>

          <Tooltip content="Submit">
            <Button
              appearance="primary"
              icon={<IconNorth />}
              ml="auto"
              size="sm"
            />
          </Tooltip>
        </Group>
      }
      placeholder="Add a comment"
      w="224"
    />
  );
}
