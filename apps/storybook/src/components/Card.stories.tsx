import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Badge,
  Box,
  Button,
  Card,
  CardAction,
  CardCheckbox,
  CardFooter,
  CardHeader,
  CardImage,
  CardLink,
  CardPreview,
  EllipsisMenuButton,
  Group,
  Link,
  Menu,
  MenuContent,
  MenuTrigger,
  Text,
} from "@optiaxiom/react";
import {
  Sortable,
  SortableHandle,
  SortableItem,
} from "@optiaxiom/react/unstable";
import { IconGripVertical } from "@tabler/icons-react";
import { useState } from "react";
import { expect, screen, userEvent } from "storybook/test";

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
        <CardPreview
          addonTopLeft={
            <CardAction>
              <CardCheckbox />
            </CardAction>
          }
        >
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
    canvas.getByRole("checkbox").focus();
  },
};

export const WithCheckboxAndActions: Story = {
  args: {
    children: (
      <>
        <CardPreview
          addonTopLeft={
            <CardAction>
              <CardCheckbox />
            </CardAction>
          }
          addonTopRight={
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
        >
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
    <Group flexDirection="column" gap="16" maxW="lg" style={{ width: "100vw" }}>
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
    </Group>
  ),
};

export const WithSortable: Story = {
  render: function Render() {
    const data: Record<
      string,
      {
        description: string;
        id: string;
        title: string;
      }
    > = {
      a1: {
        description: "A/B Test - United Kingdom or Canada or Germany",
        id: "a1",
        title: "Launch Scooter Beta Sign Up",
      },
      a2: {
        description: "A/B Test - Everyone: 14, 16, 18",
        id: "a2",
        title: "Age Experiment",
      },
      a3: {
        description: "Multi-armed bandit - Everyone: Off, Image 1",
        id: "a3",
        title: "Multi-Armed Bandit for Images",
      },
    };
    const [items, setItems] = useState(Object.keys(data));

    return (
      <Box
        bg="bg.page"
        style={{
          display: "grid",
          height: "max(512px, calc(100dvh - 2rem))",
          placeItems: "center",
          width: "max(512px, calc(100dvw - 2rem))",
        }}
      >
        <Group flexDirection="column" gap="16" style={{ width: 600 }}>
          <Sortable items={items} onItemsChange={setItems}>
            {(items) =>
              items.map((item, index) => (
                <Group gap="16" key={item}>
                  <Text color="fg.secondary" fontSize="md" w="20">
                    {index + 1}
                  </Text>
                  <SortableItem asChild index={index} item={item}>
                    <Card flex="1">
                      <CardHeader
                        addonAfter={
                          <Menu
                            options={[
                              { label: "Edit" },
                              { label: "Move down" },
                            ]}
                          >
                            <MenuTrigger asChild>
                              <EllipsisMenuButton
                                appearance="subtle"
                                aria-label="actions"
                                ml="auto"
                              />
                            </MenuTrigger>
                            <MenuContent />
                          </Menu>
                        }
                        addonBefore={
                          <SortableHandle
                            asChild
                            color="fg.tertiary"
                            transition="colors"
                          >
                            <Button
                              appearance="subtle"
                              icon={<IconGripVertical />}
                            />
                          </SortableHandle>
                        }
                        description={data[item].description}
                      >
                        <CardLink href="data:,">{data[item].title}</CardLink>
                      </CardHeader>
                    </Card>
                  </SortableItem>
                </Group>
              ))
            }
          </Sortable>
        </Group>
      </Box>
    );
  },
};
