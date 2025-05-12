import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Box, EllipsisMenuButton, Flex, Link } from "@optiaxiom/react";
import {
  Card,
  CardAction,
  CardCheckbox,
  CardContent,
  CardDescription,
  CardImage,
  CardLink,
  CardOverflow,
  CardTitle,
  Menu,
  MenuContent,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import { expect, screen, userEvent } from "@storybook/test";

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
          <CardImage src="https://placehold.co/600x400" />
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
          <CardImage src="https://placehold.co/600x400" />
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
          <CardImage src="https://placehold.co/600x400" />
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
          <CardImage src="https://placehold.co/600x400" />
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
          <CardImage src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardTitle>
          <CardLink href="data:,">The majestic world of turtles</CardLink>
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
          <CardImage src="https://placehold.co/600x400" />
        </CardOverflow>
        <Flex flexDirection="row" justifyContent="space-between">
          <CardTitle>
            <CardLink href="data:,">The majestic world of turtles</CardLink>
          </CardTitle>
          <CardAction>
            <Menu
              options={[
                { description: "Create a new task", label: "New task" },
                { description: "Copy this task", label: "Copy task" },
                {
                  group: { hidden: true, label: "Delete", separator: true },
                  intent: "danger",
                  label: "Delete task",
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
              <MenuContent />
            </Menu>
          </CardAction>
        </Flex>
      </>
    ),
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(await screen.findByRole("dialog")).toBeInTheDocument();
  },
};

export const WithCheckboxAndLink: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardAction>
            <CardCheckbox />
          </CardAction>
          <CardImage src="https://placehold.co/600x400" />
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

export const WithCheckboxAndActions: Story = {
  args: {
    children: (
      <>
        <CardOverflow>
          <CardAction>
            <CardCheckbox />

            <Menu
              options={[
                { description: "Create a new task", label: "New task" },
                { description: "Copy this task", label: "Copy task" },
                {
                  group: { hidden: true, label: "Delete", separator: true },
                  intent: "danger",
                  label: "Delete task",
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
              <MenuContent />
            </Menu>
          </CardAction>
          <CardImage src="https://placehold.co/600x400" />
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
    await userEvent.click(canvas.getByRole("button"));
    await expect(await screen.findByRole("dialog")).toBeInTheDocument();
  },
};

export const Horizontal: Story = {
  args: {
    h: "80",
    maxW: "full",
    orientation: "horizontal",
  },
  render: (args) => (
    <Flex>
      <Card {...args}>
        <CardImage src="https://placehold.co/400x400" />
        <CardContent>
          <CardTitle>
            <CardLink href="data:,">The majestic world of turtles</CardLink>
          </CardTitle>
        </CardContent>
      </Card>
      <Card {...args}>
        <CardOverflow>
          <CardImage src="https://placehold.co/400x400" />
        </CardOverflow>
        <CardContent>
          <CardTitle>
            <CardLink href="data:,">The majestic world of turtles</CardLink>
          </CardTitle>
        </CardContent>
      </Card>
    </Flex>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <Flex flexDirection="row">
      <Card {...args}>
        <CardImage src="https://placehold.co/600x400" />
        <CardContent>
          <CardTitle>
            <CardLink href="data:,">The majestic world of turtles</CardLink>
          </CardTitle>
        </CardContent>
      </Card>
      <Card {...args}>
        <CardOverflow>
          <CardImage src="https://placehold.co/600x400" />
        </CardOverflow>
        <CardContent>
          <CardTitle>
            <CardLink href="data:,">The majestic world of turtles</CardLink>
          </CardTitle>
        </CardContent>
      </Card>
    </Flex>
  ),
};
