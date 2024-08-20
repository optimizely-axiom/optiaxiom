import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex } from "@optiaxiom/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { IconChevronDown, IconCloudUpload } from "@tabler/icons-react";

export default {
  argTypes: {
    onClick: { action: "click" },
  },
  component: Button,
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

const sizes = ["sm", "md", "lg"] as const;
const appearances = [
  "default",
  "primary",
  "secondary",
  "danger",
  "danger-outline",
] as const;

export const Appearance: Story = {
  args: {
    children: "Button",
  },
  render: (args) => (
    <Flex>
      {appearances.map((appearance) => (
        <Flex alignItems="center" flexDirection="row" gap="sm" key={appearance}>
          {sizes.map((size) => (
            <Button {...args} appearance={appearance} key={size} size={size} />
          ))}
        </Flex>
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
      {sizes.map((size) => (
        <Button {...args} key={size} size={size}>
          {size}
        </Button>
      ))}
    </Flex>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
  },
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map((size) => (
        <Button {...args} key={size} size={size}>
          Button
        </Button>
      ))}
    </Flex>
  ),
};

export const StandaloneIcon: Story = {
  args: {
    icon: <IconChevronDown />,
  },
  render: (args) => (
    <Flex flexDirection="row">
      {sizes.map((size) => (
        <Button {...args} key={size} size={size} />
      ))}
    </Flex>
  ),
};

export const Icons: Story = {
  args: {
    children: "Button",
  },
  render: (args) => (
    <Flex>
      <Flex flexDirection="row">
        {sizes.map((size) => (
          <Button
            {...args}
            icon={<IconChevronDown />}
            iconPosition="start"
            key={size}
            size={size}
          />
        ))}
      </Flex>
      <Flex flexDirection="row">
        {sizes.map((size) => (
          <Button
            {...args}
            icon={<IconChevronDown />}
            iconPosition="end"
            key={size}
            size={size}
          />
        ))}
      </Flex>
    </Flex>
  ),
};

export const Link: Story = {
  args: {
    asChild: true,
  },
  render: (args) => (
    <Flex flexDirection="row">
      <Button {...args}>
        <a href="/">Sample Link</a>
      </Button>
      <Button {...args} icon={<IconChevronDown />}>
        <a href="/">Sample Link</a>
      </Button>
      <Button {...args} icon={<IconChevronDown />}>
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
    icon: <IconCloudUpload />,
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
