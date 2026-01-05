import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Badge,
  Box,
  Button,
  Group,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@optiaxiom/react";
import { SurfaceProvider } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";

export default {
  args: {
    children: (
      <>
        <TabsList>
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">Second</TabsTrigger>
          <TabsTrigger
            addonAfter={
              <Badge intent="primary" variant="strong">
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
          <TabsTrigger value="first">First</TabsTrigger>
          <TabsTrigger value="second">Second</TabsTrigger>
          <TabsTrigger
            addonAfter={
              <Badge intent="primary" variant="strong">
                8
              </Badge>
            }
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

export const Link: Story = {
  args: {
    children: (
      <>
        <TabsList>
          <TabsTrigger asChild value="first">
            <a href="#first">First</a>
          </TabsTrigger>
          <TabsTrigger asChild value="second">
            <a href="#second">Second</a>
          </TabsTrigger>
        </TabsList>

        <TabsContent py="16" value="first">
          This is first content
        </TabsContent>

        <TabsContent py="16" value="second">
          This is second content
        </TabsContent>
      </>
    ),
  },
};

export const WithSurface: Story = {
  args: {},
  render: function Render() {
    const [value, setValue] = useState("details");

    return (
      <SurfaceProvider
        accept={() => {}}
        executeTool={() => {}}
        metadata={{}}
        name="main"
        pageViewId=""
        path="product<storybook>/page<demo>/resource<task>[task-123]/tab<main>"
        reject={() => {}}
        suggestionAlert={{ register: () => () => {}, registered: true }}
        suggestionPopover={{ register: () => () => {}, registered: false }}
        suggestions={[]}
        track={action("track")}
        type="tab"
      >
        <Group alignItems="start" flexDirection="column" gap="16">
          <Tabs onValueChange={setValue} value={value} w="full">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent py="16" value="details">
              <Text>This is the details tab content</Text>
            </TabsContent>

            <TabsContent py="16" value="history">
              <Text>This is the history tab content</Text>
            </TabsContent>

            <TabsContent py="16" value="comments">
              <Text>This is the comments tab content</Text>
            </TabsContent>
          </Tabs>

          <Box>
            <Text fontSize="sm" fontWeight="600">
              Active tab: {value}
            </Text>
            <Text color="fg.secondary" fontSize="sm" mt="4">
              Check the Actions panel below to see tracked events
            </Text>
          </Box>

          <Button onClick={() => setValue("history")} size="sm">
            Switch to History
          </Button>
        </Group>
      </SurfaceProvider>
    );
  },
};
