import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Group, Progress } from "@optiaxiom/react";
import { Fragment, useState } from "react";
import { userEvent } from "storybook/test";

export default {
  args: {
    "aria-label": "Label",
  },
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
    value: 95,
    w: "384",
  },

  render: (args) => (
    <Group flexDirection="column" gap="16">
      {(["primary", "success", "danger", "opal"] as const).map((intent) => (
        <Fragment key={intent}>
          <Progress intent={intent} {...args} value={20} />
          <Progress intent={intent} {...args} />
        </Fragment>
      ))}
    </Group>
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
  render: function CompletionStagesComponent(args) {
    const [scale, setScale] = useState(1);
    return (
      <Group flexDirection="column" gap="16" w="384">
        <Group gap="16">
          <Button onClick={() => setScale(1)}>Reset</Button>
          <Button onClick={() => setScale(2)}>Forward</Button>
        </Group>
        {values.map(({ max, value }, index) => (
          <Progress
            {...args}
            key={index}
            max={max}
            value={typeof value !== "undefined" ? value * scale : undefined}
            w="full"
          />
        ))}
      </Group>
    );
  },
};
