import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "@optiaxiom/react";
import {
  expect,
  screen,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;

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
