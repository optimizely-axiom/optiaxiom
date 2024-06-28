import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex } from "@optiaxiom/react";
import { IconChevronDown, IconDownload, IconPhoto } from "@tabler/icons-react";

const meta: Meta<typeof Button> = {
  argTypes: { onClick: { action: "click" } },
  component: Button,
};

export default meta;

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
  ["ghost", "Ghost"],
] as const;

export const Default: Story = {
  ...Variants,
  args: {
    colorScheme: "secondary",
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

export const Secondary: Story = {
  ...Variants,
  args: { colorScheme: "secondary" },
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
  args: {
    colorScheme: "danger",
  },
  render: (args) => (
    <Flex flexDirection="row">
      <Button {...args} icon={<IconChevronDown />} size="sm"></Button>
      <Button {...args} icon={<IconChevronDown />} size="md"></Button>
      <Button {...args} icon={<IconChevronDown />} size="lg"></Button>
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

export const Example: Story = {
  args: {
    colorScheme: "secondary",
  },
  render: (args) => (
    <Flex flexDirection="column">
      <Flex flexDirection="row">
        <Button size="lg" {...args} icon={<IconPhoto />} iconPosition="start">
          Gallery
        </Button>
        <Button {...args} icon={<IconDownload />} iconPosition="end" size="lg">
          Download
        </Button>
      </Flex>
      <Flex flexDirection="row">
        <Button size="md" {...args} icon={<IconPhoto />} iconPosition="start">
          Gallery
        </Button>
        <Button {...args} icon={<IconDownload />} iconPosition="end" size="md">
          Download
        </Button>
      </Flex>
      <Flex flexDirection="row">
        <Button size="sm" {...args} icon={<IconPhoto />}>
          Gallery
        </Button>
        <Button {...args} icon={<IconDownload />} iconPosition="end" size="sm">
          Download
        </Button>
      </Flex>
    </Flex>
  ),
};
