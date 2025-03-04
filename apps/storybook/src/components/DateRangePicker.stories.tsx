import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button, Field, Flex } from "@optiaxiom/react";
import {
  DateRangePicker,
  DateRangePickerContent,
  DateRangePickerTrigger,
} from "@optiaxiom/react/unstable";
import { expect, screen, userEvent } from "@storybook/test";
import { useState } from "react";

export default {
  component: DateRangePicker,
  decorators: (Story) => (
    <Box w="384">
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
      <DateRangePicker {...args}>
        <DateRangePickerTrigger />
        <DateRangePickerContent />
      </DateRangePicker>
    );
  },
} as Meta<typeof DateRangePicker>;

type Story = StoryObj<typeof DateRangePicker>;

export const Basic: Story = {};

export const WithLabel: Story = {
  decorators: (Story) => (
    <Field label="Label">
      <Story />
    </Field>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(await canvas.findByRole("button", { name: "Label" }));
    await userEvent.click((await screen.findAllByText("15"))[0]);
    await userEvent.click((await screen.findAllByText("14"))[1]);
    const today = new Date();
    const expectedFrom = new Date(
      today.getFullYear() +
        "-" +
        (today.getMonth() + 1).toString().padStart(2, "0") +
        "-15 00:00:00",
    );
    const expectedTo = new Date(
      (today.getMonth() === 11
        ? today.getFullYear() + 1
        : today.getFullYear()) +
        "-" +
        (today.getMonth() === 11 ? 1 : today.getMonth() + 2)
          .toString()
          .padStart(2, "0") +
        "-14 00:00:00",
    );
    await expect(
      canvas.getByText(
        expectedFrom.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) +
          " - " +
          expectedTo.toLocaleDateString(undefined, {
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
    defaultValue: {
      from: new Date("2025-01-22 00:00:00"),
      to: new Date("2025-02-16 00:00:00"),
    },
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: {
      from: new Date("2025-01-22 00:00:00"),
      to: new Date("2025-02-16 00:00:00"),
    },
    disabled: true,
  },
};

export const Content: Story = {
  play: async ({ canvas }) => {
    await expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Done" }));
    await expect(canvas.queryByRole("dialog")).not.toBeInTheDocument();
  },
  render: function Render(args) {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState<{
      from: Date | undefined;
      to?: Date | undefined;
    }>();

    return (
      <DateRangePicker
        {...args}
        onOpenChange={setOpen}
        onValueChange={setValue}
        open={open}
        value={value}
      >
        <DateRangePickerTrigger />
        <DateRangePickerContent>
          <Flex flexDirection="row">
            <Button
              appearance="primary"
              ml="auto"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </Flex>
        </DateRangePickerContent>
      </DateRangePicker>
    );
  },
};

export const Addons: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState<{
      from: Date | undefined;
      to?: Date | undefined;
    }>();

    return (
      <DateRangePicker
        {...args}
        onOpenChange={setOpen}
        onValueChange={setValue}
        open={open}
        value={value}
      >
        <DateRangePickerTrigger />
        <DateRangePickerContent
          addonBefore={
            <Flex gap="2">
              <Button appearance="subtle">Today</Button>
              <Button appearance="subtle">This week</Button>
              <Button appearance="subtle">This month</Button>
              <Button appearance="subtle">Next week</Button>
              <Button appearance="subtle">Next month</Button>
            </Flex>
          }
        >
          <Flex flexDirection="row">
            <Button
              appearance="primary"
              ml="auto"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </Flex>
        </DateRangePickerContent>
      </DateRangePicker>
    );
  },
};
