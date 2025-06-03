import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Flex } from "@optiaxiom/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { IconChevronDown, IconCloudUpload } from "@tabler/icons-react";

export default {
  argTypes: {
    icon: {
      control: { type: "select" },
      mapping: {
        "chevron-down": <IconChevronDown />,
        "cloud-upload": <IconCloudUpload />,
      },
      options: ["chevron-down", "cloud-upload"],
    },
    onClick: { action: "click" },
  },
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=20%3A61",
    },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

const sizes = [
  ["sm", "Small"],
  ["md", "Medium"],
  ["lg", "Large"],
] as const;
const appearances = [
  "default",
  "primary",
  "subtle",
  "danger",
  "danger-outline",
] as const;

export const Basic: Story = {
  args: {
    children: "Button",
  },
};

export const Appearance: Story = {
  args: {
    children: "Button",
  },
  render: (args) => (
    <Flex>
      {appearances.map((appearance) => (
        <Button {...args} appearance={appearance} key={appearance} />
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  args: {
    children: "Button",
  },
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map(([size, label]) => (
        <Button {...args} key={size} size={size}>
          {args.children ? label : null}
        </Button>
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  ...Appearance,
  args: {
    children: "Button",
    disabled: true,
  },
};

export const Loading: Story = {
  ...Appearance,
  args: {
    "aria-label": "Loading",
    children: "Button",
    disabled: true,
    icon: "chevron-down",
    justifyContent: "flex-start",
    loading: true,
  },
  render: (args) => (
    <Flex>
      {appearances.map((appearance) => (
        <Flex flexDirection="row" key={appearance}>
          <Button {...args} appearance={appearance} icon={null} />
          <Button {...args} appearance={appearance} />
          <Button {...args} appearance={appearance}>
            {null}
          </Button>
        </Flex>
      ))}
    </Flex>
  ),
};

export const IconButton: Story = {
  ...Appearance,
  args: {
    "aria-label": "Button",
    icon: "chevron-down",
  },
};

export const IconSizes: Story = {
  ...Appearance,
  args: {
    "aria-label": "Button",
    icon: "chevron-down",
  },
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map(([size]) => (
        <Button {...args} key={size} size={size} />
      ))}
    </Flex>
  ),
};

export const IconsWithText: Story = {
  args: {
    children: "Button",
    icon: "chevron-down",
  },
  render: (args) => (
    <Flex>
      <Flex flexDirection="row">
        {sizes.map(([size]) => (
          <Button {...args} iconPosition="start" key={size} size={size} />
        ))}
      </Flex>
      <Flex flexDirection="row">
        {sizes.map(([size]) => (
          <Button {...args} iconPosition="end" key={size} size={size} />
        ))}
      </Flex>
    </Flex>
  ),
};

export const Link: Story = {
  args: {
    asChild: true,
    icon: "chevron-down",
  },
  render: (args) => (
    <Flex flexDirection="row">
      <Button {...args} icon={null}>
        <a href="/">Sample Link</a>
      </Button>
      <Button {...args}>
        <a href="/">Sample Link</a>
      </Button>
      <Button {...args} aria-label="Sample Link">
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="/" />
      </Button>
    </Flex>
  ),
};

export const Upload: Story = {
  args: {
    asChild: true,
    children: (
      <label>
        Upload file
        <VisuallyHidden>
          <input type="file" />
        </VisuallyHidden>
      </label>
    ),
    icon: "cloud-upload",
  },
  render: (args) => (
    <Flex>
      <Button {...args} />
      <Button disabled {...args}>
        <label>
          Upload file
          <VisuallyHidden>
            <input disabled type="file" />
          </VisuallyHidden>
        </label>
      </Button>
    </Flex>
  ),
};
