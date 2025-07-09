import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Flex } from "@optiaxiom/react";
import {
  Aside,
  AsideBody,
  AsideFooter,
  AsideHeader,
} from "@optiaxiom/react/unstable";
import { IconX } from "@tabler/icons-react";

export default {
  args: {
    w: "384",
  },
  component: Aside,
  decorators: (Story) => (
    <Flex
      alignItems="end"
      bg="bg.page"
      p="24"
      style={{
        height: "80vh",
        width: "600px",
      }}
    >
      <Story />
    </Flex>
  ),
} as Meta<typeof Aside>;

type Story = StoryObj<typeof Aside>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <AsideHeader
          addonAfter={
            <Button appearance="subtle" aria-label="Close" icon={<IconX />} />
          }
          description="Original Image (Oct 23, 2024)"
        >
          Header Contents
        </AsideHeader>
        <AsideBody>Body Contents</AsideBody>
        <AsideFooter>
          <Button appearance="primary">Create Task</Button>
        </AsideFooter>
      </>
    ),
  },
};
