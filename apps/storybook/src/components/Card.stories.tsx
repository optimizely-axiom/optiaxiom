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
  CardCheckbox,
  CardContent,
  CardDescription,
  CardImage,
  CardOverflow,
  CardTitle,
} from "@optiaxiom/react/unstable";
import { userEvent } from "@storybook/test";

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
  play: async ({ canvas }) => {
    canvas.getByRole("link").focus();
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
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));
  },
};

export const WithCheckboxAndLink: Story = {
  args: {
    children: (
      <>
        <CardCheckbox />
        <CardOverflow>
          <CardImage alt="" src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardTitle>
          <Link appearance="subtle" href="data:,">
            The majestic world of turtles
          </Link>
        </CardTitle>
      </>
    ),
  },
  play: async ({ canvas }) => {
    canvas.getByRole("checkbox").focus();
  },
};
