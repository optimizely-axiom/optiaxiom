import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Flex,
} from "@optiaxiom/react";
import { useState } from "react";

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
    w: "224",
  },
  component: Disclosure,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=2549:58765",
    },
  },
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

export const Controlled: Story = {
  render: function Controlled(args) {
    const [open, setOpen] = useState(true);
    return (
      <Disclosure {...args} onOpenChange={setOpen} open={open}>
        <DisclosureTrigger>Controlled Disclosure</DisclosureTrigger>
        <DisclosureContent>
          This disclosure is controlled by the parent component.
        </DisclosureContent>
      </Disclosure>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LongContentTrigger: Story = {
  args: {
    children: (
      <>
        <DisclosureTrigger>
          Thisisareallylargepieceoftextinonewordtoshowcasehowdisclosurehandlesthem.
        </DisclosureTrigger>
        <DisclosureContent>
          Content for the item. Contains multiple lines of lorem ipsum.
        </DisclosureContent>
      </>
    ),
  },
};
