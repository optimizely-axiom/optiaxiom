import type { Meta, StoryObj } from "@storybook/react-vite";

import { FileUpload } from "@optiaxiom/react/unstable";

export default {
  argTypes: {
    onFilesDrop: { action: "onFilesDrop" },
  },
  component: FileUpload,
} as Meta<typeof FileUpload>;

type Story = StoryObj<typeof FileUpload>;

export const Basic: Story = {};
