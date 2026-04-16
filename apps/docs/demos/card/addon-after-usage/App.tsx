import { IconEdit, IconLogout } from "@optiaxiom/icons";
import {
  Badge,
  Box,
  Card,
  CardHeader,
  EllipsisMenuButton,
  Menu,
  MenuContent,
  MenuTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <Box maxW="sm" w="full">
      <Card>
        <CardHeader
          addonAfter={
            <>
              <Badge>On</Badge>
              <Menu
                options={[
                  { addon: <IconEdit />, label: "Edit" },
                  {
                    addon: <IconLogout />,
                    intent: "danger",
                    label: "Delete",
                  },
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
            </>
          }
        >
          The majestic world of turtles
        </CardHeader>
      </Card>
    </Box>
  );
}
