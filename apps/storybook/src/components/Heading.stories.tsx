import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "@optiaxiom/react";

export default {
  component: Heading,
} as Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

export const Basic: Story = {
  args: {
    children: "Lorem ipsum",
  },
};

export const Levels: Story = {
  render: () => (
    <>
      <Heading level="1">This is an h1 heading</Heading>
      <Heading level="2">This is an h2 heading</Heading>
      <Heading level="3">This is an h3 heading</Heading>
      <Heading level="4">This is an h4 heading</Heading>
      <Heading level="5">This is an h5 heading</Heading>
      <Heading level="6">This is an h6 heading</Heading>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Heading asChild level="1">
        <h1>This is an h1 heading in h1 size</h1>
      </Heading>
      <Heading asChild level="2">
        <h1>This is an h1 heading in h2 size</h1>
      </Heading>
      <Heading asChild level="3">
        <h1>This is an h1 heading in h3 size</h1>
      </Heading>
      <Heading asChild level="4">
        <h1>This is an h1 heading in h4 size</h1>
      </Heading>
      <Heading asChild level="5">
        <h1>This is an h1 heading in h5 size</h1>
      </Heading>
      <Heading asChild level="6">
        <h1>This is an h1 heading in h6 size</h1>
      </Heading>
    </>
  ),
};
