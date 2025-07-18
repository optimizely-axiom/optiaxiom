import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Flex, Textarea, Tooltip } from "@optiaxiom/react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@optiaxiom/react/unstable";
import { IconArrowUp, IconPhoto } from "@tabler/icons-react";

export default {
  args: {
    children: (
      <FileUploadDropzone>
        <FileUploadTrigger />
      </FileUploadDropzone>
    ),
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
      <FileUploadDropzone description="SVG, PNG, JPG or GIF (max. 2MB)">
        <FileUploadTrigger />
      </FileUploadDropzone>
    ),
    w: "384",
  },
};

export const Overlay: Story = {
  args: {
    accept: {
      "image/*": [],
    },
    children: (
      <>
        <Textarea
          addonAfter={
            <Flex borderT="1" flexDirection="row" gap="4" p="4">
              <Tooltip content="Add images">
                <FileUploadTrigger asChild>
                  <Button
                    appearance="subtle"
                    aria-label="Add images"
                    icon={<IconPhoto />}
                    size="sm"
                  />
                </FileUploadTrigger>
              </Tooltip>

              <Tooltip content="Submit">
                <Button
                  appearance="primary"
                  aria-label="Submit"
                  icon={<IconArrowUp />}
                  ml="auto"
                  size="sm"
                />
              </Tooltip>
            </Flex>
          }
          placeholder="Add a comment"
        />
        <FileUploadDropzone overlay />
      </>
    ),
    maxW: "xs",
    style: { width: "100vw" },
  },
};
