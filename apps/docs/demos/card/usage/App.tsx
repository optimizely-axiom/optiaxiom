import beach from "@/demos/beach.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsisMenuButton,
  Flex,
} from "@optiaxiom/react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardImage,
  CardLink,
  CardOverflow,
  CardTitle,
} from "@optiaxiom/react/unstable";
import { IconLogout, IconPencil } from "@tabler/icons-react";
import Image from "next/image";

export function App() {
  return (
    <Card maxW="xs">
      <CardOverflow>
        <CardImage asChild>
          <Image
            alt="brown glass bottle beside white book on blue and white textile"
            priority
            src={beach}
          />
        </CardImage>
      </CardOverflow>
      <CardContent>
        <Flex flexDirection="row" justifyContent="space-between">
          <CardTitle>
            <CardLink href="#usage">The majestic world of turtles</CardLink>
          </CardTitle>
          <CardAction>
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
          </CardAction>
        </Flex>
        <CardDescription>Unveiling the secrets.</CardDescription>
      </CardContent>
    </Card>
  );
}
