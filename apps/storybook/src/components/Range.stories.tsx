import type { Meta, StoryObj } from "@storybook/react-vite";

import { Field, Flex, Range, Text } from "@optiaxiom/react";
import { useState } from "react";

export default {
  args: {
    "aria-label": "Volume",
    defaultValue: [50],
  },
  component: Range,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=17463-7993&m=dev",
    },
  },
} as Meta<typeof Range>;

type Story = StoryObj<typeof Range>;

export const Basic: Story = {
  args: {
    w: "384",
  },
};

export const MinMax: Story = {
  args: {
    defaultValue: [25],
    max: 100,
    min: 0,
    w: "384",
  },
};

export const Step: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
    step: 10,
    w: "384",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [60],
    disabled: true,
    w: "384",
  },
};

export const WithField: Story = {
  render: () => (
    <Field description="Adjust the volume level" w="384">
      Volume
      <Range defaultValue={[50]} />
    </Field>
  ),
};

export const Controlled: Story = {
  render: function ControlledRange() {
    const [value, setValue] = useState([50]);
    return (
      <Flex w="384">
        <Range onValueChange={setValue} value={value} />
        <Text>Value: {value[0]}</Text>
      </Flex>
    );
  },
};
