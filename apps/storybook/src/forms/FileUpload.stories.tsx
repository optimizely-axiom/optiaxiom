import type { Meta, StoryObj } from "@storybook/react";

import { FileUpload } from "@optiaxiom/react";

export default {
  argTypes: {
    onFilesUploaded: { action: "files uploaded" },
  },
  component: FileUpload,
  title: "Components/FileUpload",
} as Meta<typeof FileUpload>;

type Story = StoryObj<typeof FileUpload>;

export const Basic: Story = {
  args: {},
};

export const WithFileTypeRestriction: Story = {
  args: {
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  },
};

export const WithMultipleFiles: Story = {
  args: {
    multiple: true,
  },
};

export const WithMaxSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};
