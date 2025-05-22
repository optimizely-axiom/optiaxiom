import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Checkbox,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  SearchInput,
  Separator,
} from "@optiaxiom/react";
import { expect, screen, userEvent } from "@storybook/test";
import { useState } from "react";

type Story = StoryObj<typeof Popover>;

export default {
  args: {
    defaultOpen: true,
  },
  component: Popover,
} as Meta<typeof Popover>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent>This is a popover element.</PopoverContent>
      </>
    ),
    defaultOpen: false,
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(screen.queryByRole("dialog")).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger disabled>Disabled</PopoverTrigger>
        <PopoverContent />
      </>
    ),
    defaultOpen: false,
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const WithArrow: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent withArrow>This popover has an arrow.</PopoverContent>
      </>
    ),
  },
};

export const CustomPositioning: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger>Toggle Popover</PopoverTrigger>
        <PopoverContent align="end">
          This popover is on custom position.
        </PopoverContent>
      </>
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
            <SearchInput
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              value={searchValue}
            />
            <Button appearance="subtle" onClick={handleSelectAll} size="sm">
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
