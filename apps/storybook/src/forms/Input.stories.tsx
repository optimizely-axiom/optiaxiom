import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Input } from "@optiaxiom/react";

const meta: Meta<typeof Input> = {
  component: Input,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  render: () => (
    <Flex flexDirection="column" gap="xl" size="full">
      <Input
        defaultValue="Disabled with value"
        isDisabled={true}
        placeholder="Disabled placeholder"
      />
      <Input isDisabled={true} placeholder="Disabled placeholder" />
      <Input isInvalid={true} placeholder="Error state" />
      <Input
        defaultValue="Error with value"
        isInvalid={true}
        placeholder="Error with value"
      />
      <Input isDisabled={false} placeholder="Placeholder" type="text" />
      <Input defaultValue="This is a text input" placeholder="Placeholder" />
    </Flex>
  ),
};

export const NumberInput: Story = {
  render: () => (
    <Flex>
      <Input defaultValue="20.00" placeholder="00.00" variant="number" />
      <Input placeholder="00.00" variant="number" />
      <Input isDisabled={true} placeholder="00.00" variant="number" />
      <Input defaultValue="20.00" isInvalid={true} variant="number" />
    </Flex>
  ),
};
