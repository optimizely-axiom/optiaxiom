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

export const CompletionStages: Story = {
  render: () => {
    return (
      <Flex>
        <ProgressBar />
        <ProgressBarHook max={75} value={12.5} />
        <ProgressBarHook value={25} />
        <ProgressBarHook max={200} value={75} />
        <ProgressBar max={100} value={100} />
      </Flex>
    );
  },
};
