import type { Meta, StoryObj } from "@storybook/react";

import { Flex, FormField, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

const meta: Meta<typeof FormField> = {
  component: FormField,
  title: "Components / FormField",
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const InputStyle: Story = {
  render: () => (
    <Flex flexDirection="column" gap="xl">
      <FormField label="Form label">
        <Input
          leftSection={<IconCalendar display="block" height="16" width="20" />}
          placeholder="With Icon"
        />
      </FormField>

      <FormField label="Form label">
        <Input placeholder="Without Icon" />
      </FormField>

      <FormField isDisabled={true} label="Form label">
        <Input placeholder="Disabled" />
      </FormField>

      <FormField
        isInvalid={true}
        label="Form label"
        note="You have to submit the files"
      >
        <Input placeholder="With error" />
      </FormField>
    </Flex>
  ),
};
