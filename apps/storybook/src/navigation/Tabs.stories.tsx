import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@optiaxiom/react";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  render: () => (
    <Tabs defaultValue="first">
      <TabsList>
        <TabsTrigger value="first">First</TabsTrigger>
        <TabsTrigger value="second">Second</TabsTrigger>
        <TabsTrigger value="third">Third</TabsTrigger>
      </TabsList>
      <TabsContent value="first">
        <Box>This is first content</Box>
      </TabsContent>
      <TabsContent value="second">
        <Box>This is second content</Box>
      </TabsContent>
      <TabsContent value="third">
        <Box>This is third content</Box>
      </TabsContent>
    </Tabs>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger disabled value="tab2">
          Password
        </TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Box>
          <h3>Account Information</h3>
          <p>Manage your account details and preferences here.</p>
        </Box>
      </TabsContent>
      <TabsContent value="tab2">
        <Box>
          <h3>Change Password</h3>
          <p>Update your password and security settings.</p>
        </Box>
      </TabsContent>
      <TabsContent value="tab3">
        <Box>
          <h3>User Settings</h3>
          <p>Customize your application settings and preferences.</p>
        </Box>
      </TabsContent>
    </Tabs>
  ),
};
