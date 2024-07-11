import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  Button,
  Field,
  Flex,
  Input,
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
    <Tabs defaultValue="login">
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Box>
          <form onSubmit={(e) => e.preventDefault()}>
            <Field label="Email">
              <Input placeholder="email@example.com" type="email" />
            </Field>

            <Field label="Password" mt="10">
              <Input placeholder="Password" type="password" />
            </Field>

            <Flex>
              <Button appearance="primary" mt="10" type="submit">
                Log In
              </Button>
            </Flex>
          </form>
        </Box>
      </TabsContent>

      <TabsContent value="sign-up">
        <Box>
          <form onSubmit={(e) => e.preventDefault()}>
            <Field label="Full Name">
              <Input placeholder="John Doe" type="text" />
            </Field>

            <Field label="Email" mt="10">
              <Input placeholder="email@example.com" type="email" />
            </Field>

            <Field label="Password" mt="10">
              <Input placeholder="Password" type="password" />
            </Field>

            <Field label="Confirm Password" mt="10">
              <Input placeholder="Confirm Password" type="password" />
            </Field>

            <Flex>
              <Button appearance="primary" mt="10" type="submit">
                Sign Up
              </Button>
            </Flex>
          </form>
        </Box>
      </TabsContent>
    </Tabs>
  ),
};
