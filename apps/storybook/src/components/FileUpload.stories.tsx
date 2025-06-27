import type { Meta, StoryObj } from "@storybook/react-vite";

import { Text } from "@optiaxiom/react";
import { FileUpload, FileUploadDropzone } from "@optiaxiom/react/unstable";

export default {
  args: {
    children: <FileUploadDropzone py="64" />,
  },
  argTypes: {
    onFilesDrop: { action: "onFilesDrop" },
  },
  component: FileUpload,
} as Meta<typeof FileUpload>;

type Story = StoryObj<typeof FileUpload>;

export const Basic: Story = {
  args: {
    w: "384",
  },
};

export const Description: Story = {
  args: {
    accept: {
      "image/*": [],
    },
    children: (
      <FileUploadDropzone p="32">
        <Text color="fg.tertiary" fontSize="sm">
          SVG, PNG, JPG or GIF (max. 2MB)
        </Text>
      </FileUploadDropzone>
    ),
  },
};
