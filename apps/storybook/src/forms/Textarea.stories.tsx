import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Text, Textarea } from "@optiaxiom/react";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Enter text....",
  },
};

export const WithTopSection: Story = {
  args: {
    placeholder: "Enter text....",
    topSection: <Text>Top Section</Text>,
  },
};

export const WithBottomSection: Story = {
  args: {
    bottomSection: <Text>Bottom Section</Text>,
    placeholder: "Enter text....",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Enter text....",
  },
};

export const Readonly: Story = {
  args: {
    placeholder: "Enter text....",
    readOnly: true,
  },
};

export const NoResize: Story = {
  args: {
    placeholder: "Enter text....",
    resize: "none",
  },
};

export const Custom: Story = {
  args: {
    bottomSection: (
      <Flex alignItems="stretch" justifyContent="center">
        <Button appearance="primary">Bottom Section</Button>
      </Flex>
    ),
    placeholder: "Write your text",
    topSection: <Text>Top Section</Text>,
  },
};

export const TypesOfTextarea: Story = {
  render: () => (
    <Flex>
      <Textarea disabled={false} placeholder="Default Placeholder" />
      <Textarea defaultValue="Disabled with value" disabled />
      <Textarea disabled placeholder="Disabled placeholder" />
      <Textarea error placeholder="Error state" />
      <Textarea defaultValue="Error with value" error />
    </Flex>
  ),
};
