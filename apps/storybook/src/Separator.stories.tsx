import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Separator, Text } from "@optiaxiom/react";

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: "Components / Separator",
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Primary: Story = {
  args: {
    orientation: "horizontal",
  },

  render: ({ orientation }) => {
    const flexProps =
      orientation === "vertical"
        ? ({ flexDirection: "row", gap: "0", h: "16" } as const)
        : ({ flexDirection: "column", gap: "0" } as const);

    return (
      <Flex {...flexProps}>
        <Text>First Item</Text>
        <Separator orientation={orientation} />
        <Text>Second Item</Text>
      </Flex>
    );
  },
};
