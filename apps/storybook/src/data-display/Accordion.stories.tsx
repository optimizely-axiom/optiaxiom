import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Text,
} from "@optiaxiom/react";

export default {
  component: Accordion,
  title: "Data Display/Accordion",
} as Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: () => (
    <Accordion type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <Accordion collapsible type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>Content for the first item.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          Content for the second item. Contains multiple lines of lorem ipsum.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>Content for the third item.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleExpanded: Story = {
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          This item can be open at the same time as others.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>
          This one too can be open simultaneously.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Accordion type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text size="lg">Custom Trigger Content</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>This content uses the Text component from your library.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
