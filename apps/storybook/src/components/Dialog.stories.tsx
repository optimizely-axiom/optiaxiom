import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  Input,
  Textarea,
} from "@optiaxiom/react";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxRadioItem,
  ComboboxScrollArea,
  ComboboxTrigger,
  ComboboxValue,
  Select,
  SelectContent,
  SelectRadioItem,
  SelectTrigger,
  SelectValue,
} from "@optiaxiom/react/unstable";
import { expect, screen, userEvent, waitFor } from "@storybook/test";
import { IconArrowsDiagonal } from "@tabler/icons-react";
import { type ComponentPropsWithoutRef, type ReactNode, useState } from "react";

type DialogStoryProps = ComponentPropsWithoutRef<typeof Dialog> &
  Pick<ComponentPropsWithoutRef<typeof DialogContent>, "size"> & {
    actions?: ReactNode;
    content?: ReactNode;
    description?: string;
    title?: string;
  };

export default {
  args: {
    content: "This is the dialog content.",
    defaultOpen: true,
  },
  component: Dialog,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5324:11893",
    },
    useOverlayDecorator: true,
  },
  render: ({
    actions,
    content,
    description,
    size,
    title = "Dialog",
    ...args
  }) => {
    return (
      <Dialog {...args}>
        <DialogTrigger>Open Dialog</DialogTrigger>

        <DialogContent
          {...(!description && { ["aria-describedby"]: undefined })}
          size={size}
        >
          <DialogHeader addonAfter={actions} description={description}>
            {title}
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

const languages = [
  "Afrikaans",
  "Arabic",
  "Bangla",
  "Bulgarian",
  "Catalan",
  "Chinese (Simplified)",
  "Croatian",
  "Finnish",
  "French",
  "German",
  "Greek",
  "Hebrew",
];

function SampleCombobox() {
  const [items, setItems] = useState(languages);
  const [open, setOpen] = useState(false);

  return (
    <Combobox
      items={items}
      onInputValueChange={(value) =>
        setItems(
          value ? languages.filter((item) => item.includes(value)) : languages,
        )
      }
      onItemSelect={() => setOpen(false)}
      onOpenChange={setOpen}
      open={open}
    >
      <ComboboxTrigger>
        <ComboboxValue placeholder="Select a language" />
      </ComboboxTrigger>

      <ComboboxContent>
        <ComboboxInput placeholder="Languages..." />
        <ComboboxScrollArea>
          {items.map((item) => (
            <ComboboxRadioItem item={item} key={item}>
              {item}
            </ComboboxRadioItem>
          ))}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}

export const WithForm: Story = {
  args: {
    content: (
      <>
        <Input placeholder="Enter Name" />
        <Textarea placeholder="Enter Address" />

        <SampleCombobox />

        <Select items={languages}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>

          <SelectContent>
            {languages.map((item) => (
              <SelectRadioItem item={item} key={item}>
                {item}
              </SelectRadioItem>
            ))}
          </SelectContent>
        </Select>
      </>
    ),
    size: "sm",
    title: "Personal Details",
  },
};
