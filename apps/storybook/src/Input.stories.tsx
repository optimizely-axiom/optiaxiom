import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Input } from "@optiaxiom/react";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components / Input",
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  render: () => (
    <Flex flexDirection="column" gap="xl">
      <Input
        data-disabled
        defaultValue="Disabled with value"
        placeholder="Disabled placeholder"
      />

      <Input data-disabled placeholder="Disabled placeholder" />
      <Input data-error placeholder="Error state" />
      <Input
        data-error
        defaultValue="Error with value"
        placeholder="Error with value"
      />

      <Input p="sm" placeholder="Placeholder" type="text" />

      <Input defaultValue="This is a text input" placeholder="Placeholder" />
    </Flex>
  ),
};

export const NumberInput: Story = {
  render: () => (
    <Flex>
      <Input defaultValue="20.00" placeholder="00.00" variant="number" />

      <Input placeholder="00.00" variant="number" />
      <Input data-disabled placeholder="00.00" variant="number" />
      <Input data-error defaultValue="20.00" variant="number" />
    </Flex>
  ),
};
