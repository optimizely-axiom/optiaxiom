import {
  Box,
  EllipsisMenuButton,
  Menu,
  MenuContent,
  MenuTrigger,
} from "@optiaxiom/react";
import { Card, CardHeader, CardLink } from "@optiaxiom/react/unstable";
import { IconLogout, IconPencil } from "@tabler/icons-react";

export function App() {
  return (
    <Box maxW="sm" w="full">
      <Card>
        <CardHeader
          addonAfter={
            <Menu
              options={[
                { addon: <IconPencil />, label: "Edit" },
                { addon: <IconLogout />, intent: "danger", label: "Delete" },
              ]}
            >
              <MenuTrigger asChild>
                <EllipsisMenuButton
                  appearance="subtle"
                  aria-label="actions"
                  size="sm"
                />
              </MenuTrigger>
              <MenuContent align="end" />
            </Menu>
          }
        >
          <CardLink href="../">The majestic world of turtles</CardLink>
        </CardHeader>
      </Card>
    </Box>
  );
}
