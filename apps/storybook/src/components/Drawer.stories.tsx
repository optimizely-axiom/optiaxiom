import type { Meta, StoryObj } from "@storybook/react";

import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@optiaxiom/react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type DrawerStoryProps = ComponentPropsWithoutRef<typeof Drawer> &
  Pick<ComponentPropsWithoutRef<typeof DrawerContent>, "position"> & {
    actions?: ReactNode;
    content?: string;
    description?: string;
    withFooter?: boolean;
  };

export default {
  args: {
    content: "This is the drawer content.",
    defaultOpen: true,
  },
  component: Drawer,
  parameters: {
    useOverlayDecorator: true,
  },
  render: function Template({
    actions,
    content,
    description,
    withFooter,
    ...args
  }) {
    return (
      <Drawer {...args}>
        <DrawerTrigger>Open Drawer</DrawerTrigger>

        <DrawerContent>
          <DrawerHeader addonAfter={actions} description={description}>
            Drawer
          </DrawerHeader>

          <DrawerBody>{content}</DrawerBody>

          {withFooter && (
            <DrawerFooter>
              <DrawerClose appearance="subtle">Cancel</DrawerClose>
              <DrawerClose appearance="primary">Confirm</DrawerClose>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  },
} as Meta<DrawerStoryProps>;

type Story = StoryObj<DrawerStoryProps>;

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
    description: "This is a description for the drawer.",
  },
};

export const LongContent: Story = {
  args: {
    content: `
      This is a drawer with long content.
      It demonstrates how the drawer handles scrolling with a lot of text.
      ${"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50)}
    `,
  },
};

export const Footer: Story = {
  args: {
    withFooter: true,
  },
};

export const NonModal: Story = {
  args: {
    modal: false,
  },
};
