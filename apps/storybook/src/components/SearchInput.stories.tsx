import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, SearchInput, Text } from "@optiaxiom/react";
import { expect, userEvent, waitFor } from "@storybook/test";
import { type ChangeEvent, useState } from "react";

export default {
  args: {
    placeholder: "Search...",
    w: "224",
  },
  component: SearchInput,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=814:36171",
    },
  },
} as Meta<typeof SearchInput>;

type Story = StoryObj<typeof SearchInput>;

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
      <Flex flexDirection="column" gap="12" w="224">
        <SearchInput {...args} onChange={handleChange} value={value} />
        <Text fontSize="md">Current value: {value}</Text>
        <Button
          alignSelf="start"
          disabled={!value}
          onClick={() => setValue("")}
        >
          Clear
        </Button>
      </Flex>
    );
  },
};

export const Interactive: Story = {
  play: async ({ canvas }) => {
    const searchInput = canvas.getByPlaceholderText("Search...");
    await expect(searchInput).toBeInTheDocument();

    await userEvent.type(searchInput, "test search");
    await expect(searchInput).toHaveValue("test search");

    const clearButton = canvas.getByRole("button");
    await expect(clearButton).toBeInTheDocument();

    // Cross button should go away when input no longer has focus
    await userEvent.click(document.body);
    await waitFor(() =>
      expect(canvas.queryByRole("button")).not.toBeInTheDocument(),
    );

    await userEvent.click(clearButton);
    await expect(searchInput).toHaveValue("");
    await expect(clearButton).not.toBeInTheDocument();
  },
};
