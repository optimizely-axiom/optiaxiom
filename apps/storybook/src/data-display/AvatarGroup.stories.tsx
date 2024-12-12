import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarGroup,
  Flex,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Text,
  Tooltip,
} from "@optiaxiom/react";

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

const sizes = ["xs", "sm", "md", "xl", "2xl"] as const;

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

export const WithHoverCard: Story = {
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

        <HoverCard>
          <HoverCardTrigger asChild>
            <Avatar>+3</Avatar>
          </HoverCardTrigger>

          <HoverCardContent>
            <Flex flexDirection="column" gap="8">
              {users.slice(3).map((user, index) => (
                <Flex flexDirection="row" gap="4" key={index}>
                  <Avatar colorScheme="purple" name={user.name} src={user.src}>
                    {user.id}
                  </Avatar>

                  <Text>{user.name}</Text>
                </Flex>
              ))}
            </Flex>
          </HoverCardContent>
        </HoverCard>
      </>
    ),
  },
};
