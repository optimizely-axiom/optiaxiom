import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  Flex,
} from "@optiaxiom/react";
import { type ComponentPropsWithoutRef, useState } from "react";

const withTemplate = ({
  content = "This is the Drawer content.",
  defaultOpen = true,
  description = "",
  withFooter = false,
} = {}) =>
  function Template(props: Partial<ComponentPropsWithoutRef<typeof Drawer>>) {
    const [open, setOpen] = useState(defaultOpen);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
      <Flex>
        <Button onClick={onOpen}>Open Drawer</Button>

        <Drawer onClose={onClose} open={open} {...props}>
          <DrawerTitle description={description}>Drawer</DrawerTitle>
          <DrawerBody>{content}</DrawerBody>
          {withFooter && (
            <DrawerFooter>
              <Button appearance="subtle" onClick={onClose}>
                Cancel
              </Button>
              <Button appearance="primary" onClick={onClose}>
                Confirm
              </Button>
            </DrawerFooter>
          )}
        </Drawer>
      </Flex>
    );
  };

export default {
  component: Drawer,
  render: withTemplate(),
} as Meta<typeof Drawer>;

type Story = StoryObj<typeof Drawer>;

export const Basic: Story = {
  render: withTemplate({ defaultOpen: false }),
};

export const CloseButton: Story = {
  args: {
    withCloseButton: true,
  },
};

export const Position: Story = {
  args: {
    position: "left",
  },
};

export const Description: Story = {
  render: withTemplate({
    description: "This is a description for the drawer.",
  }),
};

export const LongContent: Story = {
  render: withTemplate({
    content: `
      This is a drawer with long content.
      It demonstrates how the drawer handles scrolling with a lot of text.
      ${"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(50)}
    `,
  }),
};

export const Footer: Story = {
  render: withTemplate({ withFooter: true }),
};
