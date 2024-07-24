import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Search, Text } from "@optiaxiom/react";
import { expect, userEvent, within } from "@storybook/test";
import { type ChangeEvent, useState } from "react";

export default {
  args: {
    placeholder: "Search...",
    w: "240",
  },
  component: Search,
} as Meta<typeof Search>;

type Story = StoryObj<typeof Search>;

export const Basic: Story = {};

export const Value: Story = {
  args: {
    defaultValue: "Initial text",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Controlled: Story = {
  render: function Sample(args) {
    const [value, setValue] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    return (
      <Flex flexDirection="column" gap="sm" w="240">
        <Search {...args} onChange={handleChange} value={value} />
        <Text>Current value: {value}</Text>
        <Button disabled={!value} onClick={() => setValue("")}>
          Clear
        </Button>
      </Flex>
    );
  },
};

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchInput = canvas.getByPlaceholderText("Search...");
    await expect(searchInput).toBeInTheDocument();

    await userEvent.type(searchInput, "test search");
    await expect(searchInput).toHaveValue("test search");

    const clearButton = canvas.getByRole("button");
    await expect(clearButton).toBeInTheDocument();
    await userEvent.click(clearButton);
    await expect(searchInput).toHaveValue("");
    await expect(clearButton).not.toBeInTheDocument();
  },
};
