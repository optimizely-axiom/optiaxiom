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
    disabled: false,
    id: "id-1",
    label: "Field label",
    m: "lg",
    p: "sm",
    placeholder: "Placeholder",
    rounded: "sm",
    variant: "text",
  },

  render: () => (
    <Stack flexDirection="column" gap="xl">
      <Input
        bg="brand.50"
        id="id-1"
        label="Label"
        m="sm"
        p="sm"
        placeholder="Placeholder with label"
        rounded="sm"
        variant="text"
      />
      <Input
        bg="brand.50"
        id="id-1"
        label="Label"
        m="sm"
        p="sm"
        placeholder="Placeholder"
        required
        rounded="sm"
        variant="text"
      />
      <Input
        bg="brand.50"
        id="id-1"
        m="sm"
        p="sm"
        placeholder="Placeholder without label"
        rounded="sm"
        variant="text"
      />
      <Input
        bg="brand.50"
        id="id-1"
        label="Label"
        m="sm"
        note="This is a note."
        p="sm"
        placeholder="Placeholder with notes"
        rounded="sm"
        variant="text"
      />
    </Stack>
  ),
};

export const NumberInput: Story = {
  args: {
    bg: "brand.50",
    id: "id-1",
    m: "lg",
    p: "sm",
    placeholder: "Placeholder",
    rounded: "sm",
    variant: "number",
  },
};

export const Composite: Story = {
  args: {
    asChild: true,
    bg: "brand.50",
    children: <Text>Hello World </Text>,
    m: "lg",
    p: "sm",
    rounded: "sm",
  },
};
