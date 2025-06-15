import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Aside,
  AsideBody,
  AsideClose,
  AsideContent,
  AsideFooter,
  AsideHeader,
  AsideTrigger,
} from "@optiaxiom/react/unstable";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type AsideStoryProps = ComponentPropsWithoutRef<typeof Aside> &
  Pick<ComponentPropsWithoutRef<typeof AsideContent>, "position"> & {
    actions?: ReactNode;
    content?: ReactNode;
    description?: string;
    withFooter?: boolean;
  };

export default {
  args: {
    content: "This is the Aside content.",
    defaultOpen: true,
  },
  component: Aside,
  parameters: {
    useOverlayDecorator: true,
  },
  render: ({
    actions,
    content,
    description,
    position,
    withFooter,
    ...args
  }: AsideStoryProps) => {
    return (
      <Aside {...args}>
        <AsideTrigger>Open Aside</AsideTrigger>

        <AsideContent position={position}>
          <AsideHeader addonAfter={actions} description={description}>
            Aside
          </AsideHeader>

          <AsideBody>{content}</AsideBody>

          {withFooter && (
            <AsideFooter>
              <AsideClose appearance="subtle">Cancel</AsideClose>
              <AsideClose appearance="primary">Confirm</AsideClose>
            </AsideFooter>
          )}
        </AsideContent>
      </Aside>
    );
  },
} as Meta<AsideStoryProps>;

type Story = StoryObj<AsideStoryProps>;

export const Basic: Story = {};

export const CloseButton: Story = {
  args: {
    actions: true,
  },
};

export const Position: Story = {
  args: {
    position: "left",
  },
};

export const Description: Story = {
  args: {
    description: "This is a description for the Aside.",
  },
};

export const LongContent: Story = {
  args: {
    content: `
      This is a Aside with long content.
      It demonstrates how the Aside handles scrolling with a lot of text.
      ${"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50)}
    `,
  },
};

export const Footer: Story = {
  args: {
    withFooter: true,
  },
};
