import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconGripVertical } from "@optiaxiom/icons";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Group,
  Text,
} from "@optiaxiom/react";
import {
  Sortable,
  SortableGroup,
  SortableHandle,
  SortableItem,
} from "@optiaxiom/react/unstable";
import { useState } from "react";
import { expect, userEvent, waitFor } from "storybook/test";

export default {
  component: Sortable,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Sortable>;

type Story = StoryObj<typeof Sortable>;

const store = {
  statuses: {
    completed: {
      id: "completed",
      label: "Completed",
    },
    "in-progress": {
      id: "in-progress",
      label: "In progress",
    },
    "not-started": {
      id: "not-started",
      label: "Not started",
    },
  } as Record<string, { id: string; label: string }>,
  users: {
    unassigned: {
      id: "unassigned",
      name: "Unassigned",
    },
    "user-1": {
      id: "user-1",
      name: "John Snow",
    },
    "user-2": {
      id: "user-2",
      name: "Jamie Lannister",
    },
  } as Record<string, { id: string; name: string }>,
};

export const Basic: Story = {
  render: function Render(args) {
    const columns = ["not-started", "in-progress", "completed"];
    const swimlanes = ["unassigned", "user-1", "user-2"];
    const cards = [
      {
        assignee: "unassigned",
        id: "card-1",
        status: "not-started",
      },
      {
        assignee: "unassigned",
        id: "card-2",
        status: "not-started",
      },
      {
        assignee: "unassigned",
        id: "card-3",
        status: "not-started",
      },
      {
        assignee: "user-1",
        id: "card-4",
        status: "not-started",
      },
      {
        assignee: "user-1",
        id: "card-5",
        status: "not-started",
      },
      {
        assignee: "user-1",
        id: "card-6",
        status: "in-progress",
      },
    ] satisfies Array<{
      assignee: (typeof swimlanes)[number];
      id: string;
      status: (typeof columns)[number];
    }>;
    const [items, setItems] = useState(() => {
      const items: Record<string, string[]> = {};
      for (const swimlane of swimlanes) {
        for (const column of columns) {
          items[`${swimlane}:${column}`] = [];
        }
      }
      for (const card of cards) {
        const id = `${card.assignee}:${card.status}`;
        items[id].push(card.id);
      }
      return items;
    });

    return (
      <Sortable
        {...args}
        bg="bg.page"
        gap="0"
        items={items}
        onItemsChange={setItems}
        p="16"
      >
        {(items) =>
          swimlanes.map((swimlane, index) => (
            <Group
              asChild
              flexDirection="column"
              gap="0"
              justifyContent="flex-start"
              key={swimlane}
            >
              <Disclosure defaultOpen>
                <DisclosureTrigger flex="none">
                  <Box alignItems="center" display="flex" gap="8">
                    <Avatar
                      name={
                        swimlane === "unassigned"
                          ? undefined
                          : store.users[swimlane].name
                      }
                      size="sm"
                    />
                    {store.users[swimlane].name}
                    <Text color="fg.tertiary" display="inline">
                      {columns.reduce(
                        (count, column) =>
                          count + items[`${swimlane}:${column}`].length,
                        0,
                      )}{" "}
                      cards
                    </Text>
                  </Box>
                </DisclosureTrigger>
                <DisclosureContent asChild>
                  <Group alignItems="stretch" flex="1" gap="16">
                    {columns.map((column) => (
                      <SortableGroup
                        asChild
                        flex="1"
                        group={`${swimlane}:${column}`}
                        index={index}
                        justifyContent="flex-start"
                        key={column}
                        py="16"
                        rounded="md"
                        transition="colors"
                      >
                        {(isDropTarget) => (
                          <Box
                            bg={
                              isDropTarget
                                ? "bg.information.subtle"
                                : "bg.avatar.neutral"
                            }
                          >
                            <Text
                              display="flex"
                              fontWeight="500"
                              gap="12"
                              mx="16"
                            >
                              {store.statuses[column].label}
                              <Badge>
                                {items[`${swimlane}:${column}`].length}
                              </Badge>
                            </Text>
                            <Group
                              flex="1"
                              flexDirection="column"
                              gap="16"
                              justifyContent="flex-start"
                              overflow="auto"
                              px="16"
                              style={{ flexBasis: 200 }}
                            >
                              {items[`${swimlane}:${column}`].map(
                                (item, index) => (
                                  <Card asChild border="0" key={item}>
                                    <SortableItem index={index} item={item}>
                                      <CardHeader>{item}</CardHeader>
                                    </SortableItem>
                                  </Card>
                                ),
                              )}
                            </Group>
                          </Box>
                        )}
                      </SortableGroup>
                    ))}
                  </Group>
                </DisclosureContent>
              </Disclosure>
            </Group>
          ))
        }
      </Sortable>
    );
  },
};

export const TallItems: Story = {
  play: async ({ canvas }) => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const [handle] = canvas.getAllByLabelText("draggable");
    const { x, y } = handle.getBoundingClientRect();

    // Move 80% of the item height: enough clone overlap to swap, but the
    // pointer is still inside the source item.
    await user.pointer({
      coords: { clientX: x, clientY: y },
      keys: "[MouseLeft>]",
      target: handle,
    });
    for (let dy = 8; dy <= 320; dy += 8) {
      await user.pointer({ coords: { clientX: x, clientY: y + dy } });
      await new Promise(requestAnimationFrame);
    }
    await user.pointer({ keys: "[/MouseLeft]" });

    await waitFor(() =>
      expect(
        canvas.getAllByRole("heading").map((el) => el.textContent),
      ).toEqual(["Notes", "Description"]),
    );
  },
  render: function Render(args) {
    const [items, setItems] = useState(["Description", "Notes"]);

    return (
      <Sortable {...args} items={items} onItemsChange={setItems} p="16">
        {(items) =>
          items.map((item, index) => (
            <Card asChild key={item} style={{ height: 400 }}>
              <SortableItem index={index} item={item}>
                <CardHeader
                  addonBefore={
                    <SortableHandle>
                      <IconGripVertical />
                    </SortableHandle>
                  }
                >
                  {item}
                </CardHeader>
              </SortableItem>
            </Card>
          ))
        }
      </Sortable>
    );
  },
};
