import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box, Group, Heading, Text } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";

export default {
  args: {
    label: "Task title",
  },
  argTypes: {
    onValueChange: { action: "onValueChange" },
  },
  component: InlineInput,
  decorators: (Story) => (
    <Box color="fg.default" w="224">
      <Story />
    </Box>
  ),
  render: (args) => (
    <Text asChild fontSize="md">
      <InlineInput {...args} />
    </Text>
  ),
} as Meta<typeof InlineInput>;

type Story = StoryObj<typeof InlineInput>;

export const Basic: Story = {};

export const DefaultValue: Story = {
  args: {
    defaultValue: "Some user input value",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Some user input value",
    disabled: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: "Enter task title...",
  },
};

export const HeadingStyle: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Heading asChild level="4">
        <InlineInput {...args} />
      </Heading>
      <Heading asChild level="4">
        <InlineInput {...args} defaultValue="Some user input value" />
      </Heading>
    </Group>
  ),
};

export const Multiline: Story = {
  args: {
    label: "Task description",
    multiline: true,
  },
  render: (args) => (
    <Group flexDirection="column" fontSize="md" gap="16">
      <Text asChild>
        <InlineInput {...args} />
      </Text>
      <Text asChild>
        <InlineInput
          {...args}
          defaultValue={"First line of description\nSecond line of description"}
        />
      </Text>
    </Group>
  ),
};
