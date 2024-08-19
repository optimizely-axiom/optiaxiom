import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Box, Button, Flex, Text } from "@optiaxiom/react";
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
    <Flex gap="xs">
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
    <Flex gap="xs">
      <Pill
        {...args}
        size="md"
        startDecorator={<Avatar name="Jamie" size="xs" />}
      />
      <Pill
        {...args}
        size="lg"
        startDecorator={<Avatar name="Jamie" size="xs" />}
      />
    </Flex>
  ),
};

export const LongText: Story = {
  args: {
    children: (
      <Text fontSize="sm" truncate w="xl">
        This is a very long text
      </Text>
    ),
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
      <Flex alignItems="center" flexDirection="column" gap="lg">
        <Flex gap="xs">
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
