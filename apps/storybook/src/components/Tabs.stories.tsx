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
          <TabsTrigger icon={<IconMessageCircle />} value="second">
            Second
          </TabsTrigger>
          <TabsTrigger
            addonAfter={
              <Badge intent="primary" variant="solid">
                8
              </Badge>
            }
            value="third"
          >
            Third
          </TabsTrigger>
        </TabsList>

        <TabsContent py="16" value="first">
          This is first content
        </TabsContent>

        <TabsContent py="16" value="second">
          This is second content
        </TabsContent>

        <TabsContent py="16" value="third">
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
          <TabsTrigger icon={<IconUser />} value="first">
            First
          </TabsTrigger>
          <TabsTrigger icon={<IconListCheck />} value="second">
            Second
          </TabsTrigger>
          <TabsTrigger
            addonAfter={
              <Badge intent="primary" variant="solid">
                8
              </Badge>
            }
            icon={<IconTrash />}
            value="third"
          >
            Third
          </TabsTrigger>
        </TabsList>

        <TabsContent px="16" value="first">
          This is first content
        </TabsContent>

        <TabsContent px="16" value="second">
          This is second content
        </TabsContent>

        <TabsContent px="16" value="third">
          This is third content
        </TabsContent>
      </>
    ),
    orientation: "vertical",
  },
};
