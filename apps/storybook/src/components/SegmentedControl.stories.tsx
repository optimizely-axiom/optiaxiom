import type { Meta, StoryObj } from "@storybook/react";

import {
  SegmentedControl,
  SegmentedControlItem,
  Tooltip,
} from "@optiaxiom/react";
import {
  IconDeviceImac,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";

export default {
  args: {
    children: (
      <>
        <Tooltip content="Desktop">
          <SegmentedControlItem
            aria-label="Desktop"
            icon={<IconDeviceImac />}
            key="desktop"
            value="desktop"
          />
        </Tooltip>
        <Tooltip content="Tablet">
          <SegmentedControlItem
            aria-label="Tablet"
            icon={<IconDeviceTablet />}
            key="tablet"
            value="tablet"
          />
        </Tooltip>
        <Tooltip content="Mobile">
          <SegmentedControlItem
            aria-label="Mobile"
            icon={<IconDeviceMobile />}
            key="mobile"
            value="mobile"
          />
        </Tooltip>
      </>
    ),
  },
  component: SegmentedControl,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=2429:8594",
    },
  },
} as Meta<typeof SegmentedControl>;

type Story = StoryObj<typeof SegmentedControl>;

export const Basic: Story = {
  args: {
    defaultValue: "desktop",
  },
};

export const Multiple: Story = {
  args: {
    defaultValue: ["desktop", "mobile"],
    type: "multiple",
  },
};

export const DisabledGroup: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledItem: Story = {
  args: {
    children: (
      <>
        <SegmentedControlItem
          aria-label="Desktop"
          disabled
          icon={<IconDeviceImac />}
          key="desktop"
          value="desktop"
        />
        <SegmentedControlItem
          aria-label="Tablet"
          icon={<IconDeviceTablet />}
          key="tablet"
          value="tablet"
        />
        <SegmentedControlItem
          aria-label="Mobile"
          icon={<IconDeviceMobile />}
          key="mobile"
          value="mobile"
        />
      </>
    ),
  },
};
