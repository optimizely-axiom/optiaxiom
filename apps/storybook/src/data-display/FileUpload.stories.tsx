import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  FileUpload,
  FileUploadDropzone,
  FileUploadLabel,
  FileUploadTrigger,
} from "@optiaxiom/react";

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Primary: Story = {
  render: () => (
    <FileUpload>
      <FileUploadLabel>File Upload</FileUploadLabel>
      <Box asChild border="2" h="lg" w="full">
        <FileUploadDropzone></FileUploadDropzone>
      </Box>
      <FileUploadTrigger>Choose file(s)</FileUploadTrigger>
    </FileUpload>
  ),
};
