import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonGroup } from "@optiaxiom/react";
import { IconArrowRight, IconDownload, IconPhoto } from "@tabler/icons-react";

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button leftSection={<IconPhoto />}>Gallery</Button>
      <Button rightSection={<IconDownload />}>Download</Button>
      <Button leftSection={<IconPhoto />} rightSection={<IconArrowRight />}>
        Enter Gallery
      </Button>
    </ButtonGroup>
  ),
};
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button leftSection={<IconPhoto />}>Gallery</Button>
      <Button rightSection={<IconDownload />}>Download</Button>
      <Button leftSection={<IconPhoto />} rightSection={<IconArrowRight />}>
        Enter Gallery
      </Button>
    </ButtonGroup>
  ),
};
