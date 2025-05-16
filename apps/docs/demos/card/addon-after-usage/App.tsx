import {
  Badge,
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsisMenuButton,
} from "@optiaxiom/react";
import { Card, CardHeader } from "@optiaxiom/react/unstable";
import { IconLogout, IconPencil } from "@tabler/icons-react";

export function App() {
  return (
    <Box maxW="sm" w="full">
      <Card>
        <CardHeader
          addonAfter={
            <>
              <Badge>On</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisMenuButton
                    appearance="subtle"
                    aria-label="actions"
                    size="sm"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem icon={<IconPencil />}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem icon={<IconLogout />} intent="danger">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }
        >
          The majestic world of turtles
        </CardHeader>
      </Card>
    </Box>
  );
}
