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

const Variants: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap="sm">
      {variants.map(([variant, label]) => (
        <Flex flexDirection="row" gap="sm" key={variant}>
          {sizes.map((size) => (
            <Button {...args} key={size} size={size} variant={variant}>
              {label} - {size}
            </Button>
          ))}
          <Button disabled {...args} variant={variant}>
            Disabled
          </Button>
        </Flex>
      ))}
    </Flex>
  ),
};

const sizes = ["sm", "md", "lg"] as const;
const appearances = [
  ["default", "Default"],
  ["primary", "Primary"],
  ["danger", "Danger"],
  ["secondary", "Secondary"],
] as const;
const variants = [
  ["solid", "Solid"],
  ["outline", "Outline"],
  ["subtle", "Subtle"],
] as const;

export const Default: Story = {
  ...Variants,
  args: {
    colorScheme: "neutral",
  },
};

export const Primary: Story = {
  ...Variants,
  args: {
    colorScheme: "primary",
  },
};

export const Danger: Story = {
  ...Variants,
  args: { colorScheme: "danger" },
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

export const appearance: Story = {
  render: (args) => (
    <Flex>
      {appearances.map(([appearance, label]) => (
        <Button {...args} appearance={appearance} key={appearance}>
          {label}
        </Button>
      ))}
    </Flex>
  ),
};

export const Link: Story = {
  args: {
    asChild: true,
    children: <a href="/">Sample Link</a>,
  },
};

export const StandaloneIcon: Story = {
  render: (args) => (
    <Flex flexDirection="row">
      <Button {...args} icon={<IconChevronDown />} size="sm" />
      <Button {...args} icon={<IconChevronDown />} size="md" />
      <Button {...args} icon={<IconChevronDown />} size="lg" />
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
        <Button
          {...args}
          icon={<IconChevronDown />}
          iconPosition="start"
          size="sm"
        />
        <Button
          {...args}
          icon={<IconChevronDown />}
          iconPosition="start"
          size="md"
        />
        <Button
          {...args}
          icon={<IconChevronDown />}
          iconPosition="start"
          size="lg"
        />
      </Flex>
      <Flex flexDirection="row">
        <Button
          {...args}
          icon={<IconChevronDown />}
          iconPosition="end"
          size="sm"
        />
        <Button
          {...args}
          icon={<IconChevronDown />}
          iconPosition="end"
          size="md"
        />
        <Button
          {...args}
          icon={<IconChevronDown />}
          iconPosition="end"
          size="lg"
        />
      </Flex>
    </Flex>
  ),
};
