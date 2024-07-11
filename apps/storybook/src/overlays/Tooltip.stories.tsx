import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Text, Tooltip } from "@optiaxiom/react";
import {
  expect,
  screen,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test";

export default {
  component: Tooltip,
} as Meta<typeof Tooltip>;

type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: {
    children: <button>Hover</button>,
    content: "Add to library",
    side: "top",
    withArrow: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("tooltip", { name: "Add to library" }),
    ).toBeInTheDocument();
    await userEvent.click(document.body);
    await waitForElementToBeRemoved(
      screen.queryByRole("tooltip", { name: "Add to library" }),
    );
  },
};

export const Truncate: Story = {
  args: {
    auto: true,
    content: "Sample Tooltip",
  },
  render: (args) => (
    <Flex>
      <Tooltip {...args}>
        <Text>The quick brown fox jumps over the lazy dog.</Text>
      </Tooltip>

      <Tooltip {...args}>
        <Text truncate w="192">
          The quick brown fox jumps over the lazy dog.
        </Text>
      </Tooltip>
    </Flex>
  ),
};
