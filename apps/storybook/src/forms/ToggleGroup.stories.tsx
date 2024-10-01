import type { Meta, StoryObj } from "@storybook/react";

import { Flex } from "@optiaxiom/react";
import { ToggleGroup, ToggleGroupItem } from "@optiaxiom/react/unstable";
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
const meta: Meta<typeof ToggleGroup> = {
  argTypes: {
    onClick: { action: "click" },
  },
  component: ToggleGroup,
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

const createToggleGroupStory = (
  storyArgs: Partial<React.ComponentProps<typeof ToggleGroup>> = {},
): Story => ({
  args: {
    children: deviceItems.map(({ icon, value }) => (
      <ToggleGroupItem icon={icon} key={value} value={value} />
    )),
    ...storyArgs,
  },
});

export const Basic: Story = createToggleGroupStory({
  defaultValue: "desktop",
});

export const Sizes: Story = {
  render: () => (
    <Flex>
      {sizes.map((size) => (
        <ToggleGroup defaultValue="desktop" key={size} type="single">
          {deviceItems.map(({ icon, value }) => (
            <ToggleGroupItem
              icon={icon}
              key={value}
              size={size}
              value={value}
            />
          ))}
        </ToggleGroup>
      ))}
    </Flex>
  ),
};

export const Multiple: Story = createToggleGroupStory({
  defaultValue: ["desktop", "mobile"],
  type: "multiple",
});

export const DisabledGroup: Story = createToggleGroupStory({
  disabled: true,
});

export const DisabledItem: Story = createToggleGroupStory({
  children: deviceItems.map(({ icon, value }, index) => (
    <ToggleGroupItem
      disabled={index === 0}
      icon={icon}
      key={value}
      value={value}
    />
  )),
});
