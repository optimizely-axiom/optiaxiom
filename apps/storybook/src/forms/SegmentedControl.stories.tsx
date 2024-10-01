import type { Meta, StoryObj } from "@storybook/react";

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@optiaxiom/react/unstable";
import {
  IconDeviceImac,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";

const meta: Meta<typeof SegmentedControl> = {
  args: {
    children: (
      <>
        <SegmentedControlItem
          icon={<IconDeviceImac />}
          key="desktop"
          value="desktop"
        />
        <SegmentedControlItem
          icon={<IconDeviceTablet />}
          key="tablet"
          value="tablet"
        />
        <SegmentedControlItem
          icon={<IconDeviceMobile />}
          key="mobile"
          value="mobile"
        />
      </>
    ),
  },
  component: SegmentedControl,
};

export default meta;

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
          disabled
          icon={<IconDeviceImac />}
          key="desktop"
          value="desktop"
        />
        <SegmentedControlItem
          icon={<IconDeviceTablet />}
          key="tablet"
          value="tablet"
        />
        <SegmentedControlItem
          icon={<IconDeviceMobile />}
          key="mobile"
          value="mobile"
        />
      </>
    ),
  },
};
