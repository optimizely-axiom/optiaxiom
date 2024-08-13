import type { Meta, StoryObj } from "@storybook/react";

import {
  Flex,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optiaxiom/react";
import { type ComponentPropsWithoutRef } from "react";

type Story = StoryObj<typeof HoverCard>;

const withTemplate = ({ triggerText = "Hover on me" } = {}) =>
  function Template(
    props: Partial<ComponentPropsWithoutRef<typeof HoverCard>>,
  ) {
    return (
      <Flex>
        <HoverCard {...props}>
          <HoverCardTrigger>{triggerText}</HoverCardTrigger>

          {props.children}
        </HoverCard>
      </Flex>
    );
  };

export default {
  component: HoverCard,
  render: withTemplate(),
} as Meta<typeof HoverCard>;

export const Basic: Story = {
  args: {
    children: (
      <HoverCardContent>This is a Hover Card element.</HoverCardContent>
    ),
  },
};

export const WithArrow: Story = {
  args: {
    children: (
      <HoverCardContent withArrow>
        This Hover Card has an arrow.
      </HoverCardContent>
    ),
  },
};

export const CustomPositioning: Story = {
  args: {
    children: (
      <HoverCardContent align="end">
        This Hover card is on custom position.
      </HoverCardContent>
    ),
  },
};
