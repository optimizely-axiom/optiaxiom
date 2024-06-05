import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex } from "@optiaxiom/react";
import {
  IconArrowRight,
  IconDownload,
  IconHelicopterLanding,
  IconPhoto,
} from "@tabler/icons-react";

const meta: Meta<typeof Button> = {
  argTypes: { onClick: { action: "click" } },
  component: Button,
  parameters: {
    layout: "centered",
  },
  title: "Components / Button",
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
const presets = [
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

export const Preset: Story = {
  render: (args) => (
    <Flex>
      {presets.map(([preset, label]) => (
        <Button {...args} key={preset} preset={preset}>
          {label}
        </Button>
      ))}
    </Flex>
  ),
};

export const StandaloneIcon: Story = {
  args: {
    children: <IconHelicopterLanding />,
  },
};

export const Icons: Story = {
  args: {
    colorScheme: "secondary",
    size: "lg",
  },
  render: (args) => (
    <Flex flexDirection="row">
      <Button {...args} leftSection={<IconPhoto />}>
        Gallery
      </Button>
      <Button {...args} rightSection={<IconDownload />}>
        Download
      </Button>
      <Button
        {...args}
        leftSection={<IconPhoto />}
        rightSection={<IconArrowRight />}
      >
        Enter Gallery
      </Button>
    </Flex>
  ),
};
