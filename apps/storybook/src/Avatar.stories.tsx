import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Flex } from "@optiaxiom/react";
import { IconUser } from "@tabler/icons-react";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Components / Avatar",
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <Flex display="flex" flexDirection="row" gap="10">
      <Avatar
        alt="John Snow"
        size="xl"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
      >
        JS
      </Avatar>
      <Avatar
        alt="Daenerys Targaryen"
        size="lg"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      >
        DT
      </Avatar>
      <Avatar alt="Jamie Lannister" size="md">
        JL
      </Avatar>
      <Avatar size="sm">NS</Avatar>
      <Avatar name="Margaery Tyrell" size="xs" />
    </Flex>
  ),
};

export const AvatarFallback: Story = {
  render: () => (
    <Flex display="flex" flexDirection="row" gap="10">
      <Avatar icon={<IconUser color="red" />} name="Quiock Hoyon" size="md">
        MT
      </Avatar>
      <Avatar name="Sergio Busquets" size="sm">
        MT
      </Avatar>
      <Avatar size="xs">RA</Avatar>
    </Flex>
  ),
};

export const AvatarFallbackWithCustomColors: Story = {
  render: () => (
    <Flex display="flex" flexDirection="row" gap="10">
      <Avatar>KP</Avatar>
      <Avatar color="red">KP</Avatar>
      <Avatar color="blue">KP</Avatar>
      <Avatar color="green">KP</Avatar>
      <Avatar color="orange">KP</Avatar>
      <Avatar color="magenta">KP</Avatar>
      <Avatar color="gray">KP</Avatar>
      <Avatar color="slate">KP</Avatar>
      <Avatar color="brand">KP</Avatar>
      <Avatar color="purple">KP</Avatar>
      <Avatar color="yellow">KP</Avatar>
      <Avatar color="dark">KP</Avatar>
    </Flex>
  ),
};
