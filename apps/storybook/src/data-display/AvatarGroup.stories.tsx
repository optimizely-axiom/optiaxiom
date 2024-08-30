import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup, Flex, Tooltip } from "@optiaxiom/react";

export default {
  component: AvatarGroup,
} as Meta<typeof AvatarGroup>;

type Story = StoryObj<typeof AvatarGroup>;

const users = [
  {
    id: "HK",
    name: "Henry Kissinger",
    src: "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "EC",
    name: "Emily Chen",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "MR",
    name: "Michael Rodriguez",
  },
  {
    id: "SP",
    name: "Sarah Patel",
  },
  {
    id: "JD",
    name: "John Doe",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "AS",
    name: "Alice Smith",
  },
  {
    id: "RJ",
    name: "Robert Johnson",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "LW",
    name: "Linda Williams",
  },
];

export const Basic: Story = {
  args: {
    children: users.map((user) => (
      <Avatar colorScheme="blue" key={user.id} name={user.name} src={user.src}>
        {user.id}
      </Avatar>
    )),
    maxItems: 2,
    size: "xs",
  },
};

const sizes = ["xs", "sm", "md", "xl", "5xl"] as const;

export const Sizes: Story = {
  args: {
    children: users.map((user) => (
      <Avatar colorScheme="blue" key={user.id} name={user.name} src={user.src}>
        {user.id}
      </Avatar>
    )),
    maxItems: 3,
  },
  render: (args) => {
    return (
      <Flex gap="md">
        {sizes.map((size) => (
          <AvatarGroup key={size} {...args} size={size} />
        ))}
      </Flex>
    );
  },
};

export const WithTooltip: Story = {
  args: {
    children: users.map((user) => (
      <Tooltip content={user.name} key={user.id}>
        <Avatar colorScheme="blue" name={user.name} src={user.src}>
          {user.id}
        </Avatar>
      </Tooltip>
    )),
    maxItems: 3,
    size: "xs",
  },
};
