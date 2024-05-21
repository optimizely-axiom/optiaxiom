import type { Meta, StoryObj } from "@storybook/react";

import { Input, Stack, Text } from "@optiaxiom/react";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components / Input",
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    bg: "brand.50",
    m: "lg",
    p: "sm",
    rounded: "sm",
    variant: 'text',
    id: 'id-1',
    label: 'Field label',
    disabled: false,
    placeholder: "Placeholder",
  },

  render: () => (
    <Stack flexDirection="column" gap="xl">
      <Input bg="brand.50" id="id-1" rounded="sm" variant="text" p="sm" m="sm" placeholder="Placeholder with label" label="Label" />
      <Input bg="brand.50" id="id-1" rounded="sm" variant="text" p="sm" m="sm" placeholder="Placeholder" label="Label" required />
      <Input bg="brand.50" id="id-1" rounded="sm" variant="text" p="sm" m="sm" placeholder="Placeholder without label"/>
      <Input bg="brand.50" id="id-1" rounded="sm" variant="text" p="sm" m="sm" placeholder="Placeholder with notes" label="Label" note="This is a note."/>

    </Stack>
  ),
  
};


export const NumberInput: Story = {
  args: {
    bg: "brand.50",
    m: "lg",
    p: "sm",
    rounded: "sm",
    variant: 'number',
    id: 'id-1',
    placeholder: "Placeholder"
  },
};


export const Composite: Story = {
    args: {
      bg: "brand.50",
      asChild: true,
      children: <Text>Hello World </Text>,
      m: "lg",
      p: "sm",
      rounded: "sm",
    },
  };