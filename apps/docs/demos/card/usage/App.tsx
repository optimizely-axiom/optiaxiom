import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsisMenuButton,
} from "@optiaxiom/react";
import {
  Card,
  CardHeader,
  CardImage,
  CardLink,
  CardPreview,
} from "@optiaxiom/react/unstable";
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
        description="Unveiling the secrets."
      >
        <CardLink href="#usage">The majestic world of turtles</CardLink>
      </CardHeader>
    </Card>
  );
}
