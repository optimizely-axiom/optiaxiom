import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Box, Flex } from "@optiaxiom/react";

const meta: Meta<typeof Badge> = {
  argTypes: {
    type: {
      control: "select",
      options: [
        "danger",
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
      ],
    },
  },
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Default Badge",
    type: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Badge",
    type: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Badge",
    type: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "Success Badge",
    type: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning Badge",
    type: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Badge",
    type: "danger",
  },
};

export const AllTypes: Story = {
  render: () => (
    <Flex flexDirection="row" gap="sm">
      <Badge type="default">Default</Badge>
      <Badge type="primary">Primary</Badge>
      <Badge type="secondary">Secondary</Badge>
      <Badge type="success">Success</Badge>
      <Badge type="warning">Warning</Badge>
      <Badge type="danger">Danger</Badge>
    </Flex>
  ),
};

export const CustomContent: Story = {
  args: {
    children: (
      <Box>
        <span aria-label="star">⭐ </span>
        Custom Content
      </Box>
    ),
    type: "primary",
  },
};
