import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  Pagination,
  Text,
} from "@optiaxiom/react";
import { VisuallyHidden } from "@optiaxiom/react/unstable";
import { expect, screen } from "storybook/test";

export default {
  component: VisuallyHidden,
} as Meta<typeof VisuallyHidden>;

type Story = StoryObj<typeof VisuallyHidden>;

const items = Array.from({ length: 40 }, (_, index) => `Item ${index + 1}`);

export const Basic: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("button", { name: "Delete invoice INV001" }),
    ).toBeVisible();
  },
  render: () => (
    <Button>
      Delete <VisuallyHidden>invoice INV001</VisuallyHidden>
    </Button>
  ),
};

export const InScrollContainer: Story = {
  play: async () => {
    const page = document.scrollingElement as HTMLElement;
    await expect(page.scrollHeight).toBe(page.clientHeight);
  },
  render: () => (
    <Box
      aria-label="Messages"
      maxH="xs"
      overflow="auto"
      role="region"
      tabIndex={0}
    >
      {items.map((item) => (
        <Text key={item} p="8">
          {item} <VisuallyHidden>(unread)</VisuallyHidden>
        </Text>
      ))}
    </Box>
  ),
};

export const InDialog: Story = {
  play: async () => {
    const dialog = await screen.findByRole("dialog");
    await expect(dialog.scrollHeight).toBe(dialog.clientHeight);
  },
  render: () => (
    <Dialog open>
      <DialogContent>
        <DialogHeader>Library</DialogHeader>
        <DialogBody>
          <Box maxH="xs" overflow="auto">
            {items.map((item) => (
              <Text key={item} p="8">
                {item}
              </Text>
            ))}
            <Pagination total={20} />
          </Box>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const FocusInScrollContainer: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText("Item 40");
    input.focus();
    await expect(input).toHaveFocus();

    const list = canvas.getByTestId("list").getBoundingClientRect();
    const control = input.closest("label")?.getBoundingClientRect();
    await expect(control?.top).toBeGreaterThanOrEqual(list.top);
    await expect(control?.bottom).toBeLessThanOrEqual(list.bottom);
  },
  render: () => (
    <Box data-testid="list" maxH="xs" overflow="auto">
      {items.map((item) => (
        <Box key={item} p="8">
          <Checkbox>{item}</Checkbox>
        </Box>
      ))}
    </Box>
  ),
};
