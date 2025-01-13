import type { Meta, StoryObj } from "@storybook/react";

import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  Link,
} from "@optiaxiom/react";
import {
  Card,
  CardDescription,
  CardImage,
  CardOverflow,
  CardTitle,
} from "@optiaxiom/react/unstable";

import { IconEllipsis } from "../../../../packages/react/src/icons/IconEllipsis";

export default {
  component: Card,
} as Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardTitle>The majestic world of turtles</CardTitle>
      </>
    ),
  },
};

export const WithCaption: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardTitle caption="Unveiling the secrets.">
          The majestic world of turtles
        </CardTitle>
      </>
    ),
  },
};

const largeText =
  "This is a longer piece of content that demonstrates how the CardDescription handles more text.";

export const WithLongDescription: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardDescription>{largeText}</CardDescription>
      </>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardTitle caption="Unveiling the secrets.">
          <Flex flexDirection="column" gap="8">
            <Badge intent="information" w="48">
              Badge
            </Badge>
            The majestic world of turtles
          </Flex>
        </CardTitle>
      </>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardDescription
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Link href="data:," overlay>
            The majestic world of turtles
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button border="0" icon={<IconEllipsis />} size="sm" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem description="Create a new task">
                New task
              </DropdownMenuItem>
              <DropdownMenuItem description="Copy this task">
                Copy task
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem intent="danger">Delete task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardDescription>
      </>
    ),
  },
};
