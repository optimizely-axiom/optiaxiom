import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Text, Textarea } from "@optiaxiom/react";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  title: "Components / Textarea",
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    placeholder: "Write your text",
    resize: "vertical",
  },
};
export const Highlight: Story = {
  args: {
    placeholder: "Write your text",
  },
};
export const Custom: Story = {
  args: {
    bottomSection: <Button>Bottom</Button>,
    placeholder: "Write your text",
    topSection: <Text>Sample</Text>,
  },
};
export const AutoResizeable: Story = {
  args: {
    placeholder: "Write your text",
  },
};

export const TypesOfTextarea: Story = {
  render: () => (
    <Flex flexDirection="column" gap="xl">
      <Textarea />
      <Textarea
        defaultValue="Disabled with value"
        disabled
        placeholder="Disabled placeholder"
      />

      <Textarea disabled placeholder="Disabled placeholder" />
      <Textarea error placeholder="Error state" />
      <Textarea
        defaultValue="Error with value"
        error
        placeholder="Error with value"
      />

      <Textarea disabled={false} placeholder="Placeholder" />

      <Textarea
        defaultValue="This is a text Textarea"
        placeholder="Placeholder"
      />
    </Flex>
  ),
};
