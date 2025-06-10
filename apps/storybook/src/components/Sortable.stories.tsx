import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Avatar,
  Badge,
  Box,
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Flex,
  Text,
} from "@optiaxiom/react";
import {
  Card,
  CardHeader,
  Sortable,
  SortableItem,
  SortableList,
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
      const items = Object.fromEntries(
        swimlanes.map((swimlane) => [
          swimlane,
          Object.fromEntries(columns.map((column) => [column, [] as string[]])),
        ]),
      );
      for (const card of cards) {
        items[card.assignee][card.status].push(card.id);
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
        {({ count, id: swimlane }) => (
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
                    {count} cards
                  </Text>
                </Box>
              </DisclosureTrigger>
              <DisclosureContent asChild>
                <SortableList alignItems="stretch" flex="1" flexDirection="row">
                  {({ count, id: column, isDropTarget }) => (
                    <Flex
                      bg={
                        isDropTarget
                          ? "bg.information.subtle"
                          : "bg.avatar.neutral"
                      }
                      flex="1"
                      justifyContent="flex-start"
                      py="16"
                      rounded="md"
                      transition="colors"
                    >
                      <Text display="flex" fontWeight="500" gap="12" mx="16">
                        {store.statuses[column].label}
                        <Badge>{count}</Badge>
                      </Text>
                      <SortableList
                        flex="1"
                        overflow="auto"
                        px="16"
                        style={{ flexBasis: 200 }}
                      >
                        {({ id: item }) => (
                          <Card asChild border="0">
                            <SortableItem>
                              <CardHeader>{item}</CardHeader>
                            </SortableItem>
                          </Card>
                        )}
                      </SortableList>
                    </Flex>
                  )}
                </SortableList>
              </DisclosureContent>
            </Disclosure>
          </Flex>
        )}
      </Sortable>
    );
  },
};
