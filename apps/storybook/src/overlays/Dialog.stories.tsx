import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@optiaxiom/react";

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Primary: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button preset="primary"> Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Custom</DialogTitle>
        <Box>This is a custom dialog.</Box>
        <DialogFooter pt="20">
          <Button>Close</Button>s<Button preset="primary">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
