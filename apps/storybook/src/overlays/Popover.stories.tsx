import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Search,
  Separator,
  Text,
} from "@optiaxiom/react";
import { type ComponentPropsWithoutRef, useState } from "react";

type Story = StoryObj<typeof Popover>;

const withTemplate = ({ triggerText = "Toggle Popover" } = {}) =>
  function Template(props: Partial<ComponentPropsWithoutRef<typeof Popover>>) {
    return (
      <Flex>
        <Popover {...props}>
          <PopoverTrigger>{triggerText}</PopoverTrigger>

          {props.children}
        </Popover>
      </Flex>
    );
  };

export default {
  component: Popover,
  render: withTemplate(),
} as Meta<typeof Popover>;

export const Basic: Story = {
  args: {
    children: <PopoverContent>This is a popover element.</PopoverContent>,
  },
};

export const WithArrow: Story = {
  args: {
    children: (
      <PopoverContent withArrow>This popover has an arrow.</PopoverContent>
    ),
  },
};

export const CustomPositioning: Story = {
  args: {
    children: (
      <PopoverContent align="end">
        This popover is on custom position.
      </PopoverContent>
    ),
  },
};

const DropdownExample = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const items = [
    "Dropdown menu item 1",
    "Dropdown menu item 2",
    "Dropdown menu item 3",
    "Dropdown menu item 4",
  ];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const handleItemToggle = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(selectedItems.length === items.length ? [] : [...items]);
  };

  return (
    <Flex>
      <Popover>
        <PopoverTrigger>Dropdown heading</PopoverTrigger>

        <PopoverContent align="start">
          <Flex flexDirection="column" gap="8">
            <Search
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              value={searchValue}
            />
            <Button appearance="secondary" onClick={handleSelectAll} size="sm">
              Select all
            </Button>
            {filteredItems.map((item, index) => (
              <Checkbox
                checked={selectedItems.includes(item)}
                key={index}
                onClick={() => handleItemToggle(item)}
                p="2"
              >
                {item}
              </Checkbox>
            ))}
            <Separator orientation="horizontal" />
            <Flex
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Button>Create label</Button>
              <Button appearance="primary">Add</Button>
            </Flex>
          </Flex>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export const DropDown: Story = {
  render: DropdownExample,
};

const PeopleExample = () => {
  const [searchValue, setSearchValue] = useState("");

  const users = [
    {
      email: "",
      id: "AM",
      name: "Assign to me",
      src: "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      email: "emily.chen@example.com",
      id: "EC",
      name: "Emily Chen",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      email: "michael.rodriguez@example.com",
      id: "MR",
      name: "Michael Rodriguez",
    },
    {
      email: "sarah.patel@example.com",
      id: "SP",
      name: "Sarah Patel",
    },
    {
      email: "david.nguyen@example.com",
      id: "DN",
      name: "David Nguyen",
      src: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Flex>
      <Popover>
        <PopoverTrigger>Dropdown heading</PopoverTrigger>

        <PopoverContent>
          <Flex
            flexDirection="column"
            gap="16"
            style={{ maxWidth: "280px", width: "280px" }}
          >
            <Search
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by Name or Email"
              value={searchValue}
            />
            <Separator orientation="horizontal" />
            {filteredUsers.map((user) => (
              <Flex
                alignItems="center"
                flexDirection="row"
                gap="8"
                key={user.id}
                p="2"
              >
                <Avatar
                  colorScheme="blue"
                  name={user.name}
                  size="md"
                  src={user.src}
                />
                <Flex flexDirection="column" gap="4" style={{ flexGrow: 1 }}>
                  <Text>{user.name}</Text>
                  {user.email && <Text color="dark.200">{user.email}</Text>}
                </Flex>
              </Flex>
            ))}
          </Flex>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export const People: Story = {
  render: PeopleExample,
};
