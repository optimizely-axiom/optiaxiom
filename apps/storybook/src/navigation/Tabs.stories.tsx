import type { Meta, StoryObj } from "@storybook/react";

import {
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@optiaxiom/react";
import {
  IconListCheck,
  IconMessageCircle,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";

export default {
  args: {
    children: (
      <>
        <TabsList>
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">
            <IconMessageCircle size="20" />
            Second
          </TabsTrigger>
          <TabsTrigger value="third">
            Third
            <Badge colorScheme="primary" variant="solid">
              8
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent py="md" value="first">
          This is first content
        </TabsContent>

        <TabsContent py="md" value="second">
          This is second content
        </TabsContent>

        <TabsContent py="md" value="third">
          This is third content
        </TabsContent>
      </>
    ),
    defaultValue: "first",
    w: "384",
  },
  component: Tabs,
} as Meta<typeof Tabs>;

type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {};

export const Manual: Story = {
  args: {
    activationMode: "manual",
  },
};

export const Vertical: Story = {
  args: {
    children: (
      <>
        <TabsList>
          <TabsTrigger value="first">
            <IconUser size="20" />
            First
          </TabsTrigger>
          <TabsTrigger value="second">
            <IconListCheck size="20" />
            Second
          </TabsTrigger>
          <TabsTrigger value="third">
            <IconTrash size="20" />
            Third
            <Badge colorScheme="primary" variant="solid">
              8
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent px="md" value="first">
          This is first content
        </TabsContent>

        <TabsContent px="md" value="second">
          This is second content
        </TabsContent>

        <TabsContent px="md" value="third">
          This is third content
        </TabsContent>
      </>
    ),
    orientation: "vertical",
  },
};
