import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Box,
  Button,
  DateRangePicker,
  DateRangePickerContent,
  DateRangePickerTrigger,
  Field,
  Flex,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";
import { expect, screen, userEvent, waitFor } from "storybook/test";

export default {
  component: DateRangePicker,
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
  },
  render: (args) => {
    return (
      <DateRangePicker {...args}>
        <DateRangePickerTrigger />
        <DateRangePickerContent today={new Date("2025-01-24T00:00:00")} />
      </DateRangePicker>
    );
  },
} as Meta<typeof DateRangePicker>;

type Story = StoryObj<typeof DateRangePicker>;

export const Basic: Story = {
  args: {
    defaultOpen: true,
  },
};

export const WithLabel: Story = {
  decorators: (Story) => (
    <Field label="Label">
      <Story />
    </Field>
  ),
  play: async ({ canvas }) => {
    await userEvent.click(await canvas.findByRole("button", { name: "Label" }));
    await userEvent.click(await screen.findByText("15"));
    await userEvent.click(
      screen.getByRole("button", { name: "Go to the next month" }),
    );
    await userEvent.click(await screen.findByText("14"));
    await expect(
      canvas.getByText(
        new Intl.DateTimeFormat(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }).formatRange(
          new Date("2025-01-15T00:00:00"),
          new Date("2025-02-14T00:00:00"),
        ),
        { collapseWhitespace: false },
      ),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
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

export const Addons: Story = {
  play: async ({ canvas }) => {
    await expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await userEvent.click(await screen.findByText("15"));
    await userEvent.click(
      screen.getByRole("button", { name: "Go to the next month" }),
    );
    await userEvent.click(await screen.findByText("14"));
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
    const [value, setValue] = useState<null | { from: Date; to: Date }>(null);

    return (
      <Flex>
        <Text fontSize="md">Start: {value?.from?.toISOString()}</Text>
        <Text fontSize="md">End: {value?.to?.toISOString()}</Text>
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
            today={new Date("2025-01-24T00:00:00")}
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
      </Flex>
    );
  },
};
