import type { Meta, StoryObj } from "@storybook/react";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Flex,
} from "@optiaxiom/react";

export default {
  args: {
    children: (
      <>
        <DisclosureTrigger>Summary item</DisclosureTrigger>
        <DisclosureContent>
          Content for the item. Contains multiple lines of lorem ipsum.
        </DisclosureContent>
      </>
    ),
    w: "320",
  },
  component: Disclosure,
} as Meta<typeof Disclosure>;

type Story = StoryObj<typeof Disclosure>;

export const Basic: Story = {
  args: {},
};

export const ChevronPosition: Story = {
  render: (args) => (
    <Flex>
      <Disclosure {...args}>
        <DisclosureTrigger>Left chevron position</DisclosureTrigger>
        <DisclosureContent>
          Content for the item. Contains multiple lines of lorem ipsum.
        </DisclosureContent>
      </Disclosure>
      <Disclosure {...args}>
        <DisclosureTrigger chevronPosition="end">
          Right chevron position
        </DisclosureTrigger>
        <DisclosureContent>
          Content for the item. Contains multiple lines of lorem ipsum.
        </DisclosureContent>
      </Disclosure>
    </Flex>
  ),
};
