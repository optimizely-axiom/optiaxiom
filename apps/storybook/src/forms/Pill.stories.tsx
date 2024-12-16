import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Box, Button, Flex } from "@optiaxiom/react";
import { Pill } from "@optiaxiom/react/unstable";
import { useState } from "react";

export default {
  component: Pill,
} as Meta<typeof Pill>;

type Story = StoryObj<typeof Pill>;

export const Basic: Story = {
  args: {
    children: "Hello",
  },
};

export const DifferentSizes: Story = {
  args: {
    children: "Pill",
  },
  render: (args) => (
    <Flex gap="8">
      <Pill {...args} size="md" />
      <Pill {...args} size="lg" />
    </Flex>
  ),
};

export const WithAvatar: Story = {
  args: {
    children: "Hello",
  },
  render: (args) => (
    <Flex gap="8">
      <Pill
        {...args}
        addonBefore={<Avatar name="Jamie" size="xs" />}
        size="md"
      />
      <Pill
        {...args}
        addonBefore={<Avatar name="Jamie" size="xs" />}
        size="lg"
      />
    </Flex>
  ),
};

export const LongContent: Story = {
  args: {
    children: "This is a very long text",
    w: "3xl",
  },
};

export const RemovablePill: Story = {
  args: {
    children: "Removable Pill",
  },
  render: function RemovablePill() {
    const [pills, setPills] = useState(["Pill 1", "Pill 2", "Pill 3"]);

    const handleRemove = (index: number) => {
      setPills(pills.filter((_, i) => i !== index));
    };

    const handleReset = () => {
      setPills(["Pill 1", "Pill 2", "Pill 3"]);
    };

    return (
      <Flex alignItems="center" flexDirection="column" gap="24">
        <Flex gap="8">
          {pills.map((pill, index) => (
            <Pill key={pill} onRemove={() => handleRemove(index)}>
              {pill}
            </Pill>
          ))}
        </Flex>
        <Box>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </Flex>
    );
  },
};
