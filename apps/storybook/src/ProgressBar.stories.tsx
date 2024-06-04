import type { Meta, StoryObj } from "@storybook/react";

import { Flex, ProgressBar } from "@optiaxiom/react";
import React from "react";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "Primitives / ProgressBar",
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Primary: Story = {
  args: {
    max: 60,
    value: 30,
  },
};

const ProgressBarHook = ({
  max = 100,
  value = 0,
}: {
  max?: number;
  value?: number;
}) => {
  const [progress, setProgress] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(2 * value), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return <ProgressBar max={max} value={progress} />;
};

export const Secondary: Story = {
  render: () => {
    return (
      <Flex>
        <ProgressBar max={100} value={0} variant="default" />
        <ProgressBarHook max={70} value={30} />
        <ProgressBarHook value={30} />
        <ProgressBarHook max={150} value={30} />
        <ProgressBar max={100} value={100} />
      </Flex>
    );
  },
};
