import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup, Box, Text, Tooltip } from "@optiaxiom/react";
import { useState } from "react";

export default {
  component: AvatarGroup,
} as Meta<typeof AvatarGroup>;

type Story = StoryObj<typeof AvatarGroup>;

const users = [
  {
    email: "",
    id: "AM",
    name: "Henry Kissinger",
    src: "https://images.unsplash.com/photo-1715029005043-e88d219a3c48?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    email: "emily.chen@example.com",
    id: "EC",
    name: "Emily Chen",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    email: "michael.rodriguez@example.com",
    id: "MR",
    name: "Michael Rodriguez",
  },
  {
    email: "sarah.patel@example.com",
    id: "SP",
    name: "Sarah Patel",
  },
];

export const Horizontal: Story = {
  render: () => {
    return (
      <AvatarGroup maxItems={2} size="lg">
        {users.map((user) => (
          <Avatar
            colorScheme="blue"
            key={user.id}
            name={user.name}
            src={user.src}
          >
            {user.id}
          </Avatar>
        ))}
      </AvatarGroup>
    );
  },
};

export const WithTooltipHorizontal: Story = {
  render: () => {
    return (
      <AvatarGroup maxItems={2} size="lg">
        {users.map((user) => (
          <Tooltip content={user.name} key={user.id}>
            <Avatar
              colorScheme="blue"
              name={user.name}
              size="lg"
              src={user.src}
            >
              {user.id}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
    );
  },
};

export const WithClickBehavior: Story = {
  render: function Click() {
    const [selectedUser, setSelectedUser] = useState<null | string>(null);

    return (
      <Box alignItems="center" display="flex" flexDirection="column">
        <AvatarGroup maxItems={3} size="lg">
          {users.map((user) => (
            <Avatar
              colorScheme="blue"
              key={user.id}
              name={user.name}
              onClick={() => setSelectedUser(user.name)}
              src={user.src}
            >
              {user.id}
            </Avatar>
          ))}
        </AvatarGroup>
        <Text mt="8">
          {selectedUser ? `Selected user: ${selectedUser}` : "No user selected"}
        </Text>
      </Box>
    );
  },
};
