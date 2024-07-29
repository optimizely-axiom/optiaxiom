import type { Meta, StoryObj } from "@storybook/react";

import {
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@optiaxiom/react";
import { IconMessageCircle } from "@tabler/icons-react";

const meta: Meta<typeof Tabs> = {
  args: {
    defaultValue: "first",
    w: "384",
  },
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
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
  },
};
