import type { Meta, StoryObj } from "@storybook/react";

import { Box, Input, Stack, Text } from "@optiaxiom/react";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components / Input",
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    bg: "brand.50",
    id: "id-1",
    label: "Field label",
    m: "lg",
    p: "sm",
    placeholder: "Placeholder",
    rounded: "sm",
    variant: "default",
  },

  render: () => (
    <Stack flexDirection="column" gap="xl">
      <Box>
        <Text as="label" fontFamily={"sans"}>
          {" "}
          Label
        </Text>
        <Input
          bg="brand.50"
          data-disabled
          id="id-1"
          label="Label"
          p="sm"
          placeholder="Disabled placeholder"
          rounded="sm"
          type="text"
        />
      </Box>
      <Box>
        <Text as="label" fontFamily={"sans"}>
          {" "}
          Label
        </Text>
        <Input
          bg="brand.50"
          id="id-1"
          label="Label"
          p="sm"
          placeholder="Placeholder"
          required
          rounded="sm"
          type="text"
        />
      </Box>
      <Input
        bg="brand.50"
        id="id-1"
        p="sm"
        placeholder="Placeholder without label"
        rounded="sm"
        type="text"
      />
      <Box>
        <Text as="label">Label</Text>
        <Input
          bg="brand.50"
          id="id-1"
          label="Label"
          note="This is a note."
          p="sm"
          placeholder="Placeholder with notes"
          required
          rounded="sm"
          type="text"
        />
        <Text as="p" color="blue.200" fontSize="sm">
          short note about it
        </Text>
      </Box>
    </Stack>
  ),
};

export const NumberInput: Story = {
  args: {
    bg: "brand.50",
    id: "id-1",
    p: "sm",
    placeholder: "Placeholder",
    rounded: "sm",
    type: "number",
    variant: "default",
  },
};
