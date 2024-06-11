import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, ProgressBar } from "@optiaxiom/react";
import { userEvent, within } from "@storybook/test";
import { useState } from "react";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Primary: Story = {
  args: {
    h: "12",
    max: 60,
    value: 30,
    bg: "bg.brand.subtle",
  },
};

const values = [
  {},
  { max: 75, value: 12.5 },
  { value: 25 },
  { max: 200, value: 75 },
  { max: 100, value: 100 },
];
export const CompletionStages: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Forward" }));
  },
  render: function CompletionStagesComponent() {
    const [scale, setScale] = useState(1);
    return (
      <Flex>
        <Flex flexDirection="row">
          <Button onClick={() => setScale(1)}>Reset</Button>
          <Button onClick={() => setScale(2)}>Forward</Button>
        </Flex>

        {values.map(({ max, value }, index) => (
          <ProgressBar
            key={index}
            bg="bg.brand.subtle"
            max={max}
            value={typeof value !== "undefined" ? value * scale : undefined}
            w="1/2"
          />
        ))}
      </Flex>
    );
  },
};
