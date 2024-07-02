import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonGroup } from "@optiaxiom/react";
import { IconDownload, IconPhoto } from "@tabler/icons-react";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button icon={<IconPhoto />} iconPosition="start">
        Gallery
      </Button>
      <Button icon={<IconDownload />} iconPosition="end">
        Download
      </Button>
    </ButtonGroup>
  ),
};
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button icon={<IconPhoto />} iconPosition="start">
        Gallery
      </Button>
      <Button icon={<IconDownload />} iconPosition="end">
        Download
      </Button>
    </ButtonGroup>
  ),
};
