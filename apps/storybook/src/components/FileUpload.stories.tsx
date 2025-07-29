import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Box,
  Button,
  Flex,
  Menu,
  MenuContent,
  MenuTrigger,
  Textarea,
  toaster,
  Tooltip,
} from "@optiaxiom/react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  useFileUploadTrigger,
} from "@optiaxiom/react/unstable";
import {
  IconArrowUp,
  IconBooks,
  IconPhoto,
  IconPlus,
  IconUpload,
} from "@tabler/icons-react";

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
          addon: <IconBooks />,
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
    <Flex flexDirection="row">
      <Box display="flex">
        <FileUpload {...args} />
      </Box>
      <Box display="flex" style={{ height: 600 }}>
        <FileUpload {...args} />
      </Box>
    </Flex>
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
