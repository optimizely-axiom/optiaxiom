import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  IconArrowUp,
  IconBookOpen,
  IconFileImage,
  IconPlus,
  IconUpload,
} from "@optiaxiom/icons";
import {
  Box,
  Button,
  Group,
  Menu,
  MenuContent,
  MenuTrigger,
  Textarea,
  toaster,
  Tooltip,
} from "@optiaxiom/react";
import {
  FileList,
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  useFileUploadTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

export default {
  args: {
    children: <FileUploadDropzone />,
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
    accept: ["image/*"],
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
    accept: ["image/*"],
    children: (
      <>
        <Textarea
          addonAfter={
            <Group borderT="1" gap="4" p="4">
              <Tooltip content="Add images">
                <FileUploadTrigger asChild>
                  <Button
                    appearance="subtle"
                    aria-label="Add images"
                    icon={<IconFileImage />}
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
            </Group>
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

function FileUploadMenu() {
  const triggerFileUpload = useFileUploadTrigger();
  return (
    <Menu
      options={[
        {
          addon: <IconUpload />,
          execute: triggerFileUpload,
          label: "Your device",
        },
        {
          addon: <IconBookOpen />,
          execute: () => toaster.create("Uploading from library..."),
          label: "Library",
        },
      ]}
    >
      <MenuTrigger icon={<IconPlus />} iconPosition="start">
        Add Content
      </MenuTrigger>
      <MenuContent />
    </Menu>
  );
}

export const MultipleSources: Story = {
  args: {
    children: (
      <FileUploadDropzone>
        <FileUploadMenu />
      </FileUploadDropzone>
    ),
    w: "384",
  },
};

export const Sizes: Story = {
  args: {
    children: (
      <FileUploadDropzone description="SVG, PNG, JPG or GIF (max. 2MB)">
        <FileUploadTrigger />
      </FileUploadDropzone>
    ),
    w: "384",
  },
  render: (args) => (
    <Group gap="16">
      <Box display="flex">
        <FileUpload {...args} />
      </Box>
      <Box display="flex" style={{ height: 600 }}>
        <FileUpload {...args} />
      </Box>
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    w: "384",
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            enabled: false,
            id: "color-contrast",
          },
        ],
      },
    },
  },
};

function FilePreviewExample() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload onFilesDrop={setFiles} w="384">
      {files.length > 0 ? <FileList files={files} /> : <FileUploadDropzone />}
    </FileUpload>
  );
}

export const FilePreview: Story = {
  render: () => <FilePreviewExample />,
};
