import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentPropsWithRef } from "react";

import {
  Button,
  ButtonGroup,
  Field,
  Group,
  Menu,
  MenuContent,
  MenuTrigger,
  SearchInput,
} from "@optiaxiom/react";
import {
  IconArrowRight,
  IconDownload,
  IconPhoto,
  IconX,
} from "@tabler/icons-react";

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
    <Group alignItems="center" flexDirection="column" gap="16">
      {appearances.map(([appearance, label]) => (
        <ButtonGroup {...args} key={appearance}>
          <BasicContent appearance={appearance}>{label}</BasicContent>
        </ButtonGroup>
      ))}
    </Group>
  ),
};

export const AppearanceSpacing: Story = {
  args: {
    gap: "8",
  },
  render: (args) => (
    <Group alignItems="center" flexDirection="column" gap="16">
      {appearances.map(([appearance, label]) => (
        <ButtonGroup {...args} key={appearance}>
          <BasicContent appearance={appearance}>{label}</BasicContent>
        </ButtonGroup>
      ))}
    </Group>
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
        <Menu options={[{ label: "Sample" }]}>
          <MenuTrigger>Category</MenuTrigger>
          <MenuContent />
        </Menu>
        <Field>
          <SearchInput aria-label="Search" />
        </Field>
        <Button aria-label="clear" icon={<IconX />} />
      </>
    ),
  },
};
