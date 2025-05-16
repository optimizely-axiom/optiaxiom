import {
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsisMenuButton,
} from "@optiaxiom/react";
import { Card, CardHeader, CardLink } from "@optiaxiom/react/unstable";
import { IconLogout, IconPencil } from "@tabler/icons-react";

export function App() {
  return (
    <Box maxW="sm" w="full">
      <Card>
        <CardHeader
          addonAfter={
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisMenuButton
                  appearance="subtle"
                  aria-label="actions"
                  size="sm"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem icon={<IconPencil />}>Edit</DropdownMenuItem>
                <DropdownMenuItem icon={<IconLogout />} intent="danger">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        >
          <CardLink href="#usage">The majestic world of turtles</CardLink>
        </CardHeader>
      </Card>
    </Box>
  );
}
