import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  Button,
  Flex,
  Grid,
  Switch,
  Text,
  Tooltip,
} from "@optiaxiom/react";
import { expect, screen, userEvent, waitFor } from "@storybook/test";
import { useState } from "react";

export default {
  component: Tooltip,
  parameters: {
    useOverlayDecorator: true,
  },
} as Meta<typeof Tooltip>;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    children: <Button>Hover</Button>,
    content: "Add to library",
    side: "top",
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("tooltip", { name: "Add to library" }),
    ).toBeInTheDocument();
  },
};

export const Controlled: Story = {
  args: {
    children: <button>Hover</button>,
    content: "Add to library",
    defaultOpen: true,
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("tooltip", { name: "Add to library" }),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("switch"));
    await userEvent.hover(canvas.getByRole("button"));
    await expect(
      screen.queryByRole("tooltip", { name: "Add to library" }),
    ).not.toBeInTheDocument();
  },
  render: function SampleStory() {
    const [enabled, setEnabled] = useState(true);
    const [open, setOpen] = useState(false);

    return (
      <Flex flexDirection="row">
        <Switch checked={enabled} onCheckedChange={setEnabled}>
          Enable tooltip
        </Switch>

        <Tooltip
          content="Add to library"
          onOpenChange={(flag) => enabled && setOpen(flag)}
          open={open}
        >
          <Button>Hover</Button>
        </Tooltip>
      </Flex>
    );
  },
};

export const DefaultOpen: Story = {
  args: {
    children: <Button>Hover</Button>,
    content: "Add to library",
    defaultOpen: true,
  },
};

export const AllPositions: Story = {
  render: (args) => (
    <Grid gap="16">
      <Tooltip align="start" content="Top Start" side="top" {...args}>
        <Button style={{ gridColumn: "2", gridRow: "1" }}>Top Start</Button>
      </Tooltip>
      <Tooltip align="center" content="Top Center" side="top" {...args}>
        <Button style={{ gridColumn: "3", gridRow: "1" }}>Top Center</Button>
      </Tooltip>
      <Tooltip align="end" content="Top End" side="top" {...args}>
        <Button style={{ gridColumn: "4", gridRow: "1" }}>Top End</Button>
      </Tooltip>

      <Tooltip align="start" content="Right Start" side="right" {...args}>
        <Button style={{ gridColumn: "5", gridRow: "2" }}>Right Start</Button>
      </Tooltip>
      <Tooltip align="center" content="Right Center" side="right" {...args}>
        <Button style={{ gridColumn: "5", gridRow: "3" }}>Right Center</Button>
      </Tooltip>
      <Tooltip align="end" content="Right End" side="right" {...args}>
        <Button style={{ gridColumn: "5", gridRow: "4" }}>Right End</Button>
      </Tooltip>

      <Tooltip align="start" content="Bottom Start" side="bottom" {...args}>
        <Button style={{ gridColumn: "2", gridRow: "5" }}>Bottom Start</Button>
      </Tooltip>
      <Tooltip align="center" content="Bottom Center" side="bottom" {...args}>
        <Button style={{ gridColumn: "3", gridRow: "5" }}>Bottom Center</Button>
      </Tooltip>
      <Tooltip align="end" content="Bottom End" side="bottom" {...args}>
        <Button style={{ gridColumn: "4", gridRow: "5" }}>Bottom End</Button>
      </Tooltip>

      <Tooltip align="start" content="Left Start" side="left" {...args}>
        <Button style={{ gridColumn: "1", gridRow: "2" }}>Left Start</Button>
      </Tooltip>
      <Tooltip align="center" content="Left Center" side="left" {...args}>
        <Button style={{ gridColumn: "1", gridRow: "3" }}>Left Center</Button>
      </Tooltip>
      <Tooltip align="end" content="Left End" side="left" {...args}>
        <Button style={{ gridColumn: "1", gridRow: "4" }}>Left End</Button>
      </Tooltip>
    </Grid>
  ),
};

export const Truncate: Story = {
  args: {
    auto: true,
  },
  play: async ({ canvas }) => {
    await userEvent.hover(canvas.getByTestId("not-truncated"));
    await expect(
      screen.queryByText("Not truncated text"),
    ).not.toBeInTheDocument();

    await userEvent.hover(canvas.getByTestId("target-truncated"));
    await waitFor(async () =>
      expect(
        await screen.findByRole("tooltip", {
          name: "Truncated text in target element",
        }),
      ).toBeVisible(),
    );

    await userEvent.hover(canvas.getByTestId("nested-truncated"));
    await waitFor(async () =>
      expect(
        await screen.findByRole("tooltip", {
          name: "Truncated text deep inside target element",
        }),
      ).toBeVisible(),
    );
  },
  render: (args) => (
    <Flex>
      <Tooltip {...args} content="Not truncated text">
        <Text data-testid="not-truncated">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </Tooltip>

      <Tooltip {...args} content="Truncated text in target element">
        <Text data-testid="target-truncated" truncate w="192">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </Tooltip>

      <Tooltip {...args} content="Truncated text deep inside target element">
        <Box asChild w="192">
          <button>
            <Text data-testid="nested-truncated" truncate>
              The quick brown fox jumps over the lazy dog.
            </Text>
          </button>
        </Box>
      </Tooltip>
    </Flex>
  ),
};
