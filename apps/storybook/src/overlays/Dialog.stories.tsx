import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optiaxiom/react";
import { expect, screen, userEvent, waitFor } from "@storybook/test";
import { IconArrowsDiagonal } from "@tabler/icons-react";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

type DialogStoryProps = {
  actions?: ReactNode;
  content?: string;
  description?: string;
} & ComponentPropsWithoutRef<typeof Dialog> &
  Pick<ComponentPropsWithoutRef<typeof DialogContent>, "size">;

export default {
  args: {
    content: "This is the dialog content.",
    defaultOpen: true,
  },
  component: Dialog,
  parameters: {
    useOverlayDecorator: true,
  },
  render: ({ actions, content, description, size, ...args }) => {
    return (
      <Dialog {...args}>
        <DialogTrigger>Open Dialog</DialogTrigger>

        <DialogContent
          {...(!description && { ["aria-describedby"]: undefined })}
          size={size}
        >
          <DialogHeader>
            <DialogTitle>Dialog</DialogTitle>
            {actions && <DialogActions>{actions}</DialogActions>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <DialogBody>{content}</DialogBody>
          <DialogFooter>
            <DialogClose appearance="primary">Confirm</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
} as Meta<DialogStoryProps>;

type Story = StoryObj<DialogStoryProps>;

const largeText =
  "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.";

export const Basic: Story = {
  args: {
    defaultOpen: false,
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await screen.findByRole("dialog", { name: "Dialog" });
    await expect(dialog).toBeInTheDocument();

    await expect(
      screen.getByRole("button", { name: "Confirm" }),
    ).toBeInTheDocument();

    const ariaLabelledBy = dialog.getAttribute("aria-labelledby");
    await expect(ariaLabelledBy).not.toBeNull();
    if (ariaLabelledBy) {
      const descriptionElement = document.getElementById(ariaLabelledBy);
      await expect(descriptionElement).not.toBeNull();
      await expect(descriptionElement?.textContent).toBe("Dialog");
    }

    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Dialog" }),
      ).not.toBeInTheDocument(),
    );

    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("dialog", { name: "Dialog" }),
    ).toBeInTheDocument();
  },
};

export const CloseButton: Story = {
  args: {
    actions: true,
  },
  play: async ({ canvas }) => {
    await expect(
      await screen.findByRole("dialog", { name: "Dialog" }),
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Close" })).toHaveStyle(
        "pointer-events: auto",
      ),
    );

    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "Dialog" }),
      ).not.toBeInTheDocument(),
    );

    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("dialog", { name: "Dialog" }),
    ).toBeInTheDocument();
  },
};

export const Actions: Story = {
  args: {
    actions: <Button appearance="subtle" icon={<IconArrowsDiagonal />} />,
  },
};

export const Description: Story = {
  args: {
    description: "This is a description",
  },
  play: async () => {
    const dialog = await screen.findByRole("dialog", { name: "Dialog" });
    await expect(dialog).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled(),
    );

    const ariaDescribedBy = dialog.getAttribute("aria-describedby");
    if (!ariaDescribedBy) {
      throw new Error("Could not get [aria-describedby] attribute");
    }
    const descriptionElement = document.getElementById(ariaDescribedBy);
    if (!descriptionElement) {
      throw new Error(
        "Could not find element referenced by [aria-describedby]",
      );
    }
    await expect(descriptionElement).toHaveTextContent("This is a description");
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Fullscreen: Story = {
  args: {
    size: "fullscreen",
  },
};

export const LongContent: Story = {
  args: {
    content: largeText,
  },
};

export const LongContentSmall: Story = {
  args: {
    ...LongContent.args,
    size: "sm",
  },
};

export const LongContentLarge: Story = {
  args: {
    ...LongContent.args,
    size: "lg",
  },
};
