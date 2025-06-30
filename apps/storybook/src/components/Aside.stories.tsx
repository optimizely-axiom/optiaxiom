import type { Meta, StoryObj } from "@storybook/react-vite";

import { Flex } from "@optiaxiom/react";
import {
  Aside,
  AsideBody,
  AsideFooter,
  AsideHeader,
} from "@optiaxiom/react/unstable";

export default {
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
        <AsideHeader>Header Contents</AsideHeader>
        <AsideBody>Body Contents</AsideBody>
        <AsideFooter>Footer Contents</AsideFooter>
      </>
    ),
  },
};
