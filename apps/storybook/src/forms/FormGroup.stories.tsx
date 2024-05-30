import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, FormGroup, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

const meta: Meta<typeof FormGroup> = {
  component: FormGroup,
  title: "Components / FormGroup",
};

export default meta;

type Story = StoryObj<typeof FormGroup>;

export const InputStyle: Story = {
  render: () => (
    <Flex flexDirection="column" gap="xl">
      <FormGroup label="Form label">
        <Input
          leftSection={<IconCalendar display="block" height="16" width="20" />}
          placeholder="With Icon"
        />
      </FormGroup>

      <FormGroup label="Form label">
        <Input placeholder="Without Icon" />
      </FormGroup>

      <FormGroup isDisabled={true} label="Form label">
        <Input placeholder="Disabled" />
      </FormGroup>

      <FormGroup
        isInvalid={true}
        label="Form label"
        note="You have to submit the files"
      >
        <Input placeholder="With error" />
      </FormGroup>

      <FormGroup label="Form botton">
        <Button justifyContent="center" mb="2">
          Click me
        </Button>
      </FormGroup>
    </Flex>
  ),
};
