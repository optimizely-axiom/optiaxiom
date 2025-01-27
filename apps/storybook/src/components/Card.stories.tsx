import type { Meta, StoryObj } from "@storybook/react";

import {
  Badge,
  Box,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { IconDots } from "@tabler/icons-react";

export default {
  args: {
    maxW: "xs",
  },
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
        <CardContent>
          <CardTitle>The majestic world of turtles</CardTitle>
          <CardDescription>Unveiling the secrets.</CardDescription>
        </CardContent>
      </>
    ),
  },
};

export const WithTruncatedDescription: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardContent>
          <CardTitle>The majestic world of turtles</CardTitle>
          <CardDescription lineClamp="2">
            This is a longer piece of content that demonstrates what truncating
            the CardDescription would look like.
          </CardDescription>
        </CardContent>
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
        <CardContent>
          <Box>
            <Badge intent="information">Badge</Badge>
          </Box>
          <CardTitle>The majestic world of turtles</CardTitle>
          <CardDescription>Unveiling the secrets.</CardDescription>
        </CardContent>
      </>
    ),
  },
};

export const WithLink: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardTitle>
          <Link appearance="subtle" href="data:," overlay>
            The majestic world of turtles
          </Link>
        </CardTitle>
      </>
    ),
  },
};

export const WithLinkAndEllipsis: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <Flex flexDirection="row" justifyContent="space-between">
          <CardTitle>
            <Link appearance="subtle" href="data:," overlay>
              The majestic world of turtles
            </Link>
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisMenuButton
                appearance="subtle"
                aria-label="actions"
                icon={<IconDots />}
                size="sm"
              />
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
        </Flex>
      </>
    ),
  },
};
