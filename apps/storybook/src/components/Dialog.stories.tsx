import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  Group,
  Input,
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
  Select,
  SelectContent,
  SelectTrigger,
  Text,
  Textarea,
} from "@optiaxiom/react";
import { SurfaceProvider } from "@optiaxiom/react/unstable";
import { IconArrowsDiagonal } from "@tabler/icons-react";
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { action } from "storybook/actions";
import { expect, screen, userEvent, waitFor } from "storybook/test";

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

const largeText = (
  <>
    {"This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.".repeat(
      10,
    )}
    <Input placeholder="Focus" />
    {"This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.".repeat(
      10,
    )}
  </>
);

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
    actions: (
      <Button
        appearance="subtle"
        aria-label="maximize"
        icon={<IconArrowsDiagonal />}
      />
    ),
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

function SampleMenu() {
  const [value, setValue] = useState<string>();

  return (
    <Menu
      options={useMemo(
        () =>
          languages.map<MenuOption>((language) => ({
            execute: () => setValue(language),
            label: language,
            selected: () => value === language,
          })),
        [value],
      )}
    >
      <MenuTrigger>{value || "Set language"}</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}

export const WithForm: Story = {
  args: {
    content: (
      <>
        <Input placeholder="Enter Name" />
        <Textarea placeholder="Enter Address" />

        <SampleMenu />

        <Select
          options={languages.map((language) => ({
            label: language,
            value: language,
          }))}
        >
          <SelectTrigger placeholder="Select language" />
          <SelectContent />
        </Select>
      </>
    ),
    size: "sm",
    title: "Personal Details",
  },
};

export const WithSurface: Story = {
  args: {},
  render: function Render({
    actions,
    content,
    description,
    size,
    title = "Dialog",
    ...args
  }) {
    const [open, setOpen] = useState(args.defaultOpen);

    return (
      <SurfaceProvider
        accept={() => {}}
        executeTool={() => {}}
        metadata={{}}
        name="main"
        pageViewId=""
        path="product<storybook>/page<demo>/resource<task>[task-123]/dialog<main>"
        reject={() => {}}
        suggestionPopover={{ register: () => () => {}, registered: false }}
        suggestions={[]}
        track={action("track")}
        type="dialog"
      >
        <Group alignItems="start" flexDirection="column" gap="16">
          <Dialog {...args} onOpenChange={setOpen} open={open}>
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

          <Box>
            <Text fontSize="sm" fontWeight="600">
              Dialog open: {open}
            </Text>
            <Text color="fg.secondary" fontSize="sm" mt="4">
              Check the Actions panel below to see tracked events
            </Text>
          </Box>

          <Button onClick={() => setOpen(true)} size="sm">
            Open dialog
          </Button>
        </Group>
      </SurfaceProvider>
    );
  },
};
