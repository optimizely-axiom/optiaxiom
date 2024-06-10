import type { Meta, StoryObj } from "@storybook/react";

import { Flex, FormField, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

const meta: Meta<typeof FormField> = {
  component: FormField,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const InputStyle: Story = {
  render: () => (
    <Flex flexDirection="column" gap="xl">
      <FormField label="Form label" required>
        <Input
          leftSection={<IconCalendar size="16" />}
          placeholder="With Icon"
        />
      </FormField>

      <FormField error={false} label="Form label">
        <Input placeholder="Without Icon" />
      </FormField>

      <FormField disabled label="Form label">
        <Input placeholder="Disabled" />
      </FormField>

      <FormField description="Form note" error label="Form label">
        <Input placeholder="With error" />
      </FormField>
    </Flex>
  ),
};
