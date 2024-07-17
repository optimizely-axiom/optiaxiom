import type { Meta, StoryObj } from "@storybook/react";

import { Box, Flex, Search } from "@optiaxiom/react";
import { expect, userEvent, within } from "@storybook/test";
import { type ChangeEvent, useState } from "react";

export default {
  component: Search,
} as Meta<typeof Search>;

type Story = StoryObj<typeof Search>;

export const Basic: Story = {
  render: () => (
    <Flex w="240">
      <Search placeholder="Search..." />
    </Flex>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Flex w="240">
      <Search defaultValue="Initial text" placeholder="Search..." />
    </Flex>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Flex w="240">
      <Search disabled placeholder="Search..." />
    </Flex>
  ),
};

export const Controlled = () => {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Flex flexDirection="column" gap="sm" w="240">
      <Search
        onChange={handleChange}
        placeholder="Type to search..."
        value={value}
      />
      <Box>Current value: {value}</Box>
    </Flex>
  );
};

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Type to search...");
    await expect(searchInput).toBeInTheDocument();
    await userEvent.type(searchInput, "test search");
    await expect(searchInput).toHaveValue("test search");
    const clearButton = canvas.getByRole("button");
    await expect(clearButton).toBeInTheDocument();
    await userEvent.click(clearButton);
    await expect(searchInput).toHaveValue("");
    await expect(clearButton).not.toBeInTheDocument();
  },
  render: () => (
    <Flex w="240">
      <Search placeholder="Type to search..." />
    </Flex>
  ),
};
