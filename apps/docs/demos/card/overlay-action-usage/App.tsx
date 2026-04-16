import { IconMusicNote2, IconStar } from "@optiaxiom/icons";
import {
  Badge,
  Box,
  Button,
  Card,
  CardAction,
  CardCheckbox,
  CardHeader,
  CardPreview,
  Group,
} from "@optiaxiom/react";

export function App() {
  return (
    <Group flexDirection={["column", "row"]} gap="16">
      <Card size="224">
        <CardPreview
          addonTopLeft={
            <CardAction>
              <CardCheckbox />
            </CardAction>
          }
          bg="bg.page"
          flex="1"
        >
          <Box
            bg="bg.default"
            color="fg.success"
            p="16"
            rounded="md"
            shadow="sm"
          >
            <IconMusicNote2 size="32" />
          </Box>
        </CardPreview>
        <CardHeader>Checkbox</CardHeader>
      </Card>
      <Card size="224">
        <CardPreview
          addonBottomLeft={<Badge intent="warning">Duplicate</Badge>}
          addonTopLeft={
            <CardAction>
              <CardCheckbox />
            </CardAction>
          }
          addonTopRight={
            <CardAction>
              <Button aria-label="Add to favorites" icon={<IconStar />} />
            </CardAction>
          }
          bg="bg.page"
          flex="1"
        >
          <Box
            bg="bg.default"
            color="fg.success"
            p="16"
            rounded="md"
            shadow="sm"
          >
            <IconMusicNote2 size="32" />
          </Box>
        </CardPreview>
        <CardHeader>Checkbox and star button</CardHeader>
      </Card>
    </Group>
  );
}
