import type { Meta, StoryObj } from "@storybook/react";

import { Box, Button, Field, Flex, Text } from "@optiaxiom/react";
import {
  DateRangePicker,
  DateRangePickerContent,
  DateRangePickerTrigger,
} from "@optiaxiom/react/unstable";
import { expect, screen, userEvent, waitFor } from "@storybook/test";
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
    await expect(
      canvas.getByText(
        new Date("2025-01-15 00:00:00").toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) +
          " - " +
          new Date("2025-02-14 00:00:00").toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
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
    await userEvent.click((await screen.findAllByText("15"))[0]);
    await userEvent.click((await screen.findAllByText("14"))[1]);
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
    const [value, setValue] = useState<null | {
      from: Date | undefined;
      to?: Date | undefined;
    }>(null);

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
