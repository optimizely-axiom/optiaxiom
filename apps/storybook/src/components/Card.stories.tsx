import type { Meta, StoryObj } from "@storybook/react";

import {
  Badge,
  Box,
  EllipsisMenuButton,
  Flex,
  Link,
  Text,
} from "@optiaxiom/react";
import {
  Card,
  CardAction,
  CardCheckbox,
  CardFooter,
  CardHeader,
  CardImage,
  CardLink,
  CardOverlay,
  CardPreview,
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
        <CardPreview>
          <CardImage src="https://placehold.co/600x400" />
        </CardPreview>
        <CardHeader>The majestic world of turtles</CardHeader>
      </>
    ),
    maxH: "xs",
    style: { height: "100vh" },
  },
};

export const WithCaption: Story = {
  args: {
    children: (
      <>
        <CardPreview>
          <CardImage src="https://placehold.co/600x400" />
        </CardPreview>
        <CardHeader description="Unveiling the secrets.">
          The majestic world of turtles
        </CardHeader>
      </>
    ),
  },
};

export const WithTruncatedDescription: Story = {
  args: {
    children: (
      <>
        <CardPreview>
          <CardImage src="https://placehold.co/600x400" />
        </CardPreview>
        <CardHeader
          description={
            <Text lineClamp="2">
              This is a longer piece of content that demonstrates what
              truncating the CardDescription would look like.
            </Text>
          }
        >
          The majestic world of turtles
        </CardHeader>
      </>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    children: (
      <>
        <CardPreview>
          <CardImage src="https://placehold.co/600x400" />
        </CardPreview>
        <Badge intent="information">Badge</Badge>
        <CardHeader description="Unveiling the secrets.">
          The majestic world of turtles
        </CardHeader>
      </>
    ),
  },
};

export const WithLink: Story = {
  args: {
    children: (
      <>
        <CardPreview>
          <CardImage src="https://placehold.co/600x400" />
        </CardPreview>
        <CardHeader>
          <CardLink href="data:,">The majestic world of turtles</CardLink>
        </CardHeader>
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
        <CardHeader
          addonAfter={
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
          }
          description="Unveiling the secrets."
        >
          <CardLink href="data:,">The majestic world of turtles</CardLink>
        </CardHeader>
        <CardFooter>
          <Badge intent="information">Badge</Badge>
        </CardFooter>
      </>
    ),
    h: "224",
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
        <CardPreview>
          <CardImage src="https://placehold.co/600x400" />
          <CardOverlay>
            <CardAction>
              <CardCheckbox />
            </CardAction>
          </CardOverlay>
        </CardPreview>
        <CardHeader>
          <Link appearance="subtle" href="data:,">
            The majestic world of turtles
          </Link>
        </CardHeader>
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
        <CardPreview>
          <CardOverlay>
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
          </CardOverlay>
          <CardImage src="https://placehold.co/600x400" />
        </CardPreview>
        <CardHeader>
          <Link appearance="subtle" href="data:,">
            The majestic world of turtles
          </Link>
        </CardHeader>
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
  },
  render: (args) => (
    <Flex maxW="lg" style={{ width: "100vw" }}>
      <Card {...args}>
        <CardHeader
          addonAfter={
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
          }
          addonBefore={
            <Box asChild rounded="xs" size="xl">
              <img alt="" src="https://placehold.co/400x400" />
            </Box>
          }
        >
          <CardLink href="data:,">The majestic world of turtles</CardLink>
        </CardHeader>
      </Card>
      <Card {...args}>
        <CardHeader
          addonAfter={<Badge>On</Badge>}
          description="A/B Test - United Kingdom or Canada or Germany"
        >
          <CardLink href="data:,">Launch Scooter Beta Sign Up</CardLink>
        </CardHeader>
      </Card>
    </Flex>
  ),
};
