import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentPropsWithRef } from "react";

import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuTrigger,
  Flex,
  SearchInput,
} from "@optiaxiom/react";
import { IconArrowRight, IconDownload, IconPhoto } from "@tabler/icons-react";

export default {
  component: ButtonGroup,
} as Meta<typeof ButtonGroup>;

type Story = StoryObj<typeof ButtonGroup>;

const Content = ({
  appearance,
}: Pick<ComponentPropsWithRef<typeof Button>, "appearance">) => (
  <>
    <Button appearance={appearance} icon={<IconPhoto />}>
      Gallery
    </Button>
    <Button appearance={appearance} icon={<IconDownload />} iconPosition="end">
      Download
    </Button>
    <Button
      appearance={appearance}
      icon={<IconArrowRight />}
      iconPosition="end"
    >
      Enter Gallery
    </Button>
  </>
);

const BasicContent = ({
  children,
  ...props
}: Pick<ComponentPropsWithRef<typeof Button>, "appearance" | "children">) => (
  <>
    <Button {...props}>{children} One</Button>
    <Button {...props}>{children} Two</Button>
  </>
);

export const Horizontal: Story = {
  args: {
    children: <Content />,
  },
};

export const Vertical: Story = {
  args: {
    children: <Content />,
    orientation: "vertical",
  },
};

export const Spacing: Story = {
  args: {
    children: <Content />,
    gap: "8",
  },
};

const appearances = [
  ["default", "Default"],
  ["primary", "Primary"],
  ["danger", "Danger"],
  ["danger-outline", "Outline"],
  ["subtle", "Subtle"],
] as const;

export const Appearance: Story = {
  render: (args) => (
    <Flex alignItems="center">
      {appearances.map(([appearance, label]) => (
        <ButtonGroup {...args} key={appearance}>
          <BasicContent appearance={appearance}>{label}</BasicContent>
        </ButtonGroup>
      ))}
    </Flex>
  ),
};

export const AppearanceSpacing: Story = {
  args: {
    gap: "8",
  },
  render: (args) => (
    <Flex alignItems="center">
      {appearances.map(([appearance, label]) => (
        <ButtonGroup {...args} key={appearance}>
          <BasicContent appearance={appearance}>{label}</BasicContent>
        </ButtonGroup>
      ))}
    </Flex>
  ),
};

export const OnlyChild: Story = {
  args: {
    children: <Button>Single Button</Button>,
  },
};

export const WithInput: Story = {
  args: {
    children: (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>Category</DropdownMenuTrigger>
        </DropdownMenu>
        <SearchInput />
      </>
    ),
  },
};
