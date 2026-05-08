import { IconArrowRightFromBracket, IconPen } from "@optiaxiom/icons";
import {
  Card,
  CardHeader,
  CardImage,
  CardLink,
  CardPreview,
  EllipsisMenuButton,
  Menu,
  MenuContent,
  MenuTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <Card maxW="xs">
      <CardPreview>
        <CardImage
          alt="brown glass bottle beside white book on blue and white textile"
          src="https://picsum.photos/seed/optiaxiom/640/427"
        />
      </CardPreview>
      <CardHeader
        addonAfter={
          <Menu
            options={[
              { addon: <IconPen />, label: "Edit" },
              {
                addon: <IconArrowRightFromBracket />,
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
        }
        description="Unveiling the secrets."
      >
        <CardLink href="../">The majestic world of turtles</CardLink>
      </CardHeader>
    </Card>
  );
}
