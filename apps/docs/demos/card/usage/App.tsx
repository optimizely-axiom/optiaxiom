import beach from "@/demos/beach.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EllipsisMenuButton,
  Flex,
  Link,
} from "@optiaxiom/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardImage,
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
            <Link appearance="subtle" href="#usage" overlay>
              The majestic world of turtles
            </Link>
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisMenuButton
                appearance="subtle"
                aria-label="actions"
                size="sm"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem icon={<IconPencil />}>Edit</DropdownMenuItem>
              <DropdownMenuItem icon={<IconLogout />} intent="danger">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
        <CardDescription>Unveiling the secrets.</CardDescription>
      </CardContent>
    </Card>
  );
}
