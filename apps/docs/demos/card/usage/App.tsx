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
import { IconLogout, IconPencil } from "@tabler/icons-react";
import Image from "next/image";

import beach from "@/demos/beach.jpg";

export function App() {
  return (
    <Card maxW="xs">
      <CardPreview>
        <CardImage asChild>
          <Image
            alt="brown glass bottle beside white book on blue and white textile"
            priority
            src={beach}
          />
        </CardImage>
      </CardPreview>
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
        description="Unveiling the secrets."
      >
        <CardLink href="../">The majestic world of turtles</CardLink>
      </CardHeader>
    </Card>
  );
}
