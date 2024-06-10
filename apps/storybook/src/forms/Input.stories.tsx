import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

const meta: Meta<typeof Input> = {
  component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  render: () => (
    <Flex flexDirection="column" gap="xl" size="full">
      <Input
        defaultValue="Disabled with value"
        disabled
        placeholder="Disabled placeholder"
      />
      <Input disabled placeholder="Disabled placeholder" />
      <Input error placeholder="Error state" />
      <Input
        defaultValue="Error with value"
        error
        placeholder="Error with value"
      />
      <Input disabled={false} placeholder="Placeholder" type="text" />
      <Input defaultValue="This is a text input" placeholder="Placeholder" />
    </Flex>
  ),
};

export const TextInputWithIcon: Story = {
  render: () => (
    <Flex>
      <Input
        leftSection={<IconCalendar size="16" />}
        placeholder="With left Icon"
      />
      <Input
        placeholder="With right Icon"
        rightSection={<IconCalendar size="16" />}
      />
      <Input
        leftSection={<IconCalendar size="16" />}
        placeholder="With both Icon"
        rightSection={<IconCalendar size="16" />}
      />
      <Input
        disabled
        leftSection={<IconCalendar size="16" />}
        rightSection={<IconCalendar size="16" />}
      />
      <Input
        error
        leftSection={<IconCalendar size="16" />}
        rightSection={<IconCalendar size="16" />}
      />
    </Flex>
  ),
};

export const NumberInput: Story = {
  render: () => (
    <Flex>
      <Input defaultValue="20.00" placeholder="00.00" variant="number" />
      <Input placeholder="00.00" variant="number" />
      <Input disabled placeholder="00.00" variant="number" />
      <Input defaultValue="20.00" error variant="number" />
    </Flex>
  ),
};
