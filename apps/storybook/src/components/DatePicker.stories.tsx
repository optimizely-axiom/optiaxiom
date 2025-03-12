import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button, Field, Flex } from "@optiaxiom/react";
import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@optiaxiom/react/unstable";
import { expect, screen, userEvent, waitFor } from "@storybook/test";
import { useState } from "react";

export default {
  component: DatePicker,
  decorators: (Story) => (
    <Box w="224">
      <Story />
    </Box>
  ),
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=5743-27573",
    },
    useOverlayDecorator: true,
  },
  render: (args) => {
    return (
      <DatePicker {...args}>
        <DatePickerTrigger />
        <DatePickerContent today={new Date("2025-01-24T00:00:00")} />
      </DatePicker>
    );
  },
} as Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

export const Basic: Story = {};

export const WithLabel: Story = {
  decorators: (Story) => (
    <Field label="Label">
      <Story />
    </Field>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(await canvas.findByRole("button", { name: "Label" }));
    await userEvent.click(await screen.findByText("15"));
    await expect(
      canvas.getByText(
        new Date("2025-01-15 00:00:00").toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      ),
    ).toBeInTheDocument();
  },
};

export const DefaultValue: Story = {
  args: {
    defaultValue: new Date("2025-01-22 00:00:00"),
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: new Date("2025-01-22 00:00:00"),
    disabled: true,
  },
};

export const Content: Story = {
  play: async ({ canvas }) => {
    await expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Done" }));
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();

    await waitFor(() =>
      expect(canvas.getByRole("button")).toHaveAttribute(
        "aria-expanded",
        "false",
      ),
    );
    await userEvent.click(await canvas.findByRole("button"));
  },
  render: function Render(args) {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState<Date>();

    return (
      <DatePicker
        {...args}
        onOpenChange={setOpen}
        onValueChange={setValue}
        open={open}
        value={value}
      >
        <DatePickerTrigger />
        <DatePickerContent today={new Date("2025-01-24T00:00:00")}>
          <Flex flexDirection="row">
            <Button
              appearance="primary"
              ml="auto"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </Flex>
        </DatePickerContent>
      </DatePicker>
    );
  },
};

export const WithTime: Story = {
  args: {
    defaultOpen: true,
    defaultValue: new Date("2025-01-22 10:10:00"),
    step: "300",
    type: "datetime-local",
  },
};
