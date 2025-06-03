import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Flex, Progress } from "@optiaxiom/react";
import { useState } from "react";
import { userEvent } from "storybook/test";

export default {
  component: Progress,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=8028:11251",
    },
  },
} as Meta<typeof Progress>;

type Story = StoryObj<typeof Progress>;

export const Basic: Story = {
  args: {
    value: 30,
    w: "384",
  },
};

export const Intent: Story = {
  args: {
    value: 50,
    w: "384",
  },

  render: (args) => (
    <Flex>
      <Progress {...args} />
      <Progress intent="success" {...args} />
      <Progress intent="danger" {...args} />
    </Flex>
  ),
};

const values = [
  {},
  { max: 75, value: 12.5 },
  { value: 0 },
  { value: 25 },
  { max: 200, value: 75 },
  { max: 100, value: 100 },
  { max: 100, value: 50 },
];
export const CompletionStages: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Forward" }));
  },
  render: function CompletionStagesComponent() {
    const [scale, setScale] = useState(1);
    return (
      <Flex w="384">
        <Flex flexDirection="row">
          <Button onClick={() => setScale(1)}>Reset</Button>
          <Button onClick={() => setScale(2)}>Forward</Button>
        </Flex>

        {values.map(({ max, value }, index) => (
          <Progress
            key={index}
            max={max}
            value={typeof value !== "undefined" ? value * scale : undefined}
            w="full"
          />
        ))}
      </Flex>
    );
  },
};
