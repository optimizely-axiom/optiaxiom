import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Flex,
  Text,
} from "@optiaxiom/react";
import {
  Sortable,
  SortableGroup,
  SortableItem,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

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
            <Flex asChild gap="0" justifyContent="flex-start" key={swimlane}>
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
                  <Flex alignItems="stretch" flex="1" flexDirection="row">
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
                            <Flex
                              flex="1"
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
                            </Flex>
                          </Box>
                        )}
                      </SortableGroup>
                    ))}
                  </Flex>
                </DisclosureContent>
              </Disclosure>
            </Flex>
          ))
        }
      </Sortable>
    );
  },
};
