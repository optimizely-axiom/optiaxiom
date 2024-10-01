import type { Meta, StoryObj } from "@storybook/react";

import { Flex } from "@optiaxiom/react";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@optiaxiom/react/unstable";
import {
  IconDeviceImac,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";

const deviceItems = [
  { icon: <IconDeviceImac />, value: "desktop" },
  { icon: <IconDeviceTablet />, value: "tablet" },
  { icon: <IconDeviceMobile />, value: "mobile" },
] as const;

const sizes = ["sm", "md", "lg"] as const;
const meta: Meta<typeof SegmentedControl> = {
  argTypes: {
    onClick: { action: "click" },
  },
  component: SegmentedControl,
};

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

const createSegmentedControlStory = (
  storyArgs: Partial<React.ComponentProps<typeof SegmentedControl>> = {},
): Story => ({
  args: {
    children: deviceItems.map(({ icon, value }) => (
      <SegmentedControlItem icon={icon} key={value} value={value} />
    )),
    ...storyArgs,
  },
});

export const Basic: Story = createSegmentedControlStory({
  defaultValue: "desktop",
});

export const Sizes: Story = {
  render: () => (
    <Flex>
      {sizes.map((size) => (
        <SegmentedControl defaultValue="desktop" key={size} type="single">
          {deviceItems.map(({ icon, value }) => (
            <SegmentedControlItem
              icon={icon}
              key={value}
              size={size}
              value={value}
            />
          ))}
        </SegmentedControl>
      ))}
    </Flex>
  ),
};

export const Multiple: Story = createSegmentedControlStory({
  defaultValue: ["desktop", "mobile"],
  type: "multiple",
});

export const DisabledGroup: Story = createSegmentedControlStory({
  disabled: true,
});

export const DisabledItem: Story = createSegmentedControlStory({
  children: deviceItems.map(({ icon, value }, index) => (
    <SegmentedControlItem
      disabled={index === 0}
      icon={icon}
      key={value}
      value={value}
    />
  )),
});
