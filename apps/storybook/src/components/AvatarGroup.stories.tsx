import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup, Flex, Tooltip } from "@optiaxiom/react";

const users = [
  {
    id: "HK",
    name: "Henry Kissinger",
    src: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: "EC",
    name: "Emily Chen",
    src: "https://i.pravatar.cc/150?img=24",
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
    src: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: "AS",
    name: "Alice Smith",
  },
  {
    id: "RJ",
    name: "Robert Johnson",
    src: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: "LW",
    name: "Linda Williams",
  },
];

export default {
  args: {
    children: (
      <>
        {users.slice(0, 3).map((user) => (
          <Avatar
            colorScheme="purple"
            key={user.id}
            name={user.name}
            src={user.src}
          >
            {user.id}
          </Avatar>
        ))}

        <Avatar>+3</Avatar>
      </>
    ),
  },
  component: AvatarGroup,
} as Meta<typeof AvatarGroup>;

type Story = StoryObj<typeof AvatarGroup>;

export const Basic: Story = {};

const sizes = ["xs", "sm", "md", "xl", "3xl"] as const;

export const Sizes: Story = {
  render: (args) => {
    return (
      <Flex gap="16">
        {sizes.map((size) => (
          <AvatarGroup key={size} {...args} size={size} />
        ))}
      </Flex>
    );
  },
};

export const WithTooltip: Story = {
  args: {
    children: (
      <>
        {users.slice(0, 3).map((user) => (
          <Tooltip content={user.name} key={user.id}>
            <Avatar colorScheme="purple" name={user.name} src={user.src}>
              {user.id}
            </Avatar>
          </Tooltip>
        ))}

        <Tooltip
          content={new Intl.ListFormat("en").format(
            users.slice(3).map((user) => user.name),
          )}
        >
          <Avatar>+3</Avatar>
        </Tooltip>
      </>
    ),
  },
};
