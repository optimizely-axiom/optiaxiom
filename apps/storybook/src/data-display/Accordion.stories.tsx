import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@optiaxiom/react";
import { IconArrowRight, IconCaretDownFilled } from "@tabler/icons-react";

export default {
  args: {
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>First Item</AccordionTrigger>
          <AccordionContent>
            Content for the first item. Contains multiple lines of lorem ipsum.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>
            Content for the second item. Contains multiple lines of lorem ipsum.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Third Item</AccordionTrigger>
          <AccordionContent>
            Content for the third item. Contains multiple lines of lorem ipsum.
          </AccordionContent>
        </AccordionItem>
      </>
    ),
    w: "320",
  },
  component: Accordion,
} as Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  args: {
    type: "single",
  },
};

export const Secondary: Story = {
  args: {
    appearance: "secondary",
    type: "single",
  },
};

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
};

export const CustomChevrons: Story = {
  args: {
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>Regular Chevron</AccordionTrigger>
          <AccordionContent>
            This item uses the built-in chevron icon.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger addonAfter={<IconCaretDownFilled />}>
            Custom Caret
          </AccordionTrigger>
          <AccordionContent>
            This item uses a custom caret icon.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger addonBefore={<IconArrowRight />}>
            Custom Arrow
          </AccordionTrigger>
          <AccordionContent>
            This item uses a custom arrow icon.
          </AccordionContent>
        </AccordionItem>
      </>
    ),
    type: "single",
  },
};
