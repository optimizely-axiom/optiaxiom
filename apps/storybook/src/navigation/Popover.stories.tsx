/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Checkbox,
  Flex,
  Link,
  Popover,
  PopoverContent,
  Search,
  Separator,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

export default {
  component: Popover,
} as Meta<typeof Popover>;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Flex alignItems="center">
        <Button onClick={() => setOpen(!open)}>Toggle Popover</Button>

        <Popover onOpenChange={setOpen} open={open}>
          <PopoverContent alignOffset={0} sideOffset={0}>
            <Text>This is a basic popover content.</Text>
          </PopoverContent>
        </Popover>
      </Flex>
    );
  },
};

// Popover with Arrow
export const WithArrow: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Flex alignItems="center">
        <Button onClick={() => setOpen(!open)}>
          Toggle Popover with Arrow
        </Button>
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverContent withArrow>
            <Text>This popover has an arrow.</Text>
          </PopoverContent>
        </Popover>
      </Flex>
    );
  },
};

// Popover with Close Button
export const WithCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Flex alignItems="center">
        <Button onClick={() => setOpen(!open)}>
          Toggle Popover with Close Button
        </Button>
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverContent withCloseButton>
            <Text>This popover has a close button.</Text>
          </PopoverContent>
        </Popover>
      </Flex>
    );
  },
};

// Popover with Custom Positioning
export const CustomPositioning: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button appearance="primary" onClick={() => setOpen(!open)}>
          Custom
        </Button>
        <Popover onOpenChange={setOpen} open={open}>
          <PopoverContent align="end" side="bottom" sideOffset={5}>
            <Text>
              This popover is positioned at the bottom-end of the trigger.
            </Text>
          </PopoverContent>
        </Popover>
      </>
    );
  },
};

// Popover with Rich Content
export const RichContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Flex alignItems="center">
        <Button onClick={() => setOpen(!open)}>Toggle Rich Popover</Button>

        <Popover onOpenChange={setOpen} open={open}>
          <PopoverContent>
            <Flex alignItems="center" flexDirection="column" gap="2">
              <Text fontWeight="500">Rich Popover Content</Text>
              <Text>This popover contains multiple elements.</Text>
              <Button
                appearance="primary"
                onClick={() => setOpen(false)}
                size="sm"
              >
                Done
              </Button>
            </Flex>
          </PopoverContent>
        </Popover>
      </Flex>
    );
  },
};

const DropdownExample = () => {
  const [open, setOpen] = useState(false);

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
    <Flex gap="0">
      <Button onClick={() => setOpen(!open)}>Dropdown heading</Button>

      <Popover onOpenChange={setOpen} open={open}>
        <PopoverContent align="start">
          <Flex flexDirection="column" gap="8">
            <Search
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              value={searchValue}
            />
            <Link onClick={handleSelectAll}>Select all</Link>
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
              <Link>Create label</Link>
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
