import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "@optiaxiom/react";
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

const ProgressBarHook = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <ProgressBar value={progress} />;
};

export const Secondary: Story = {
  render: () => <ProgressBarHook />,
};
