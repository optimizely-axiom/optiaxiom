import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Aside,
  AsideBody,
  AsideFooter,
  AsideHeader,
} from "@optiaxiom/react/unstable";

export default {
  component: Aside,
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
