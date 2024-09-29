import type { Meta, StoryObj } from "@storybook/react";

import { ToggleGroup, ToggleGroupItem } from "@optiaxiom/react/unstable";

export default {
  argTypes: {
    onClick: { action: "click" },
  },
  component: ToggleGroup,
} as Meta<typeof ToggleGroup>;

type Story = StoryObj<typeof ToggleGroup>;

export const Basic: Story = {
  render: () => {
    return (
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
        <ToggleGroupItem value="c">C</ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
