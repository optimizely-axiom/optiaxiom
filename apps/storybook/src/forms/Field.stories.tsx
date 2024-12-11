import type { Meta, StoryObj } from "@storybook/react";

import { Field, Flex, Input, Textarea } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

export default {
  args: {
    children: "input",
    label: "Label",
  },
  argTypes: {
    children: {
      control: { type: "select" },
      mapping: {
        input: <Input placeholder="Enter text..." w="256" />,
        textarea: <Textarea placeholder="Enter text..." w="256" />,
      },
      options: ["input", "textarea"],
    },
  },
  component: Field,
} as Meta<typeof Field>;

type Story = StoryObj<typeof Field>;

export const Basic: Story = {};

export const sizes: Story = {
  render: () => (
    <Flex>
      <Field label="Label">
        <Input placeholder="Enter text..." w="256" />
      </Field>
      <Field label="Label">
        <Input placeholder="Enter text..." size="lg" w="256" />
      </Field>
    </Flex>
  ),
};

export const Required: Story = {
  args: {
    children: (
      <Input
        addonBefore={<IconCalendar size="20" />}
        placeholder="Enter date..."
        w="256"
      />
    ),
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: <Input disabled placeholder="Enter text..." w="256" />,
  },
};

export const Description: Story = {
  args: {
    description: "Form note",
  },
};

export const Error: Story = {
  args: {
    error: "Required field",
  },
};

export const ErrorNoMessage: Story = {
  args: {
    error: true,
  },
};

export const DescriptionAndError: Story = {
  args: {
    ...Description.args,
    ...Error.args,
  },
};

export const Info: Story = {
  args: {
    info: "This is an important input",
  },
};

export const RequiredAndInfo: Story = {
  args: {
    ...Info.args,
    ...Required.args,
  },
};

export const WithTextarea: Story = {
  args: {
    children: "textarea",
    info: "This is an important textarea",
    label: "Label",
    required: true,
  },
};
