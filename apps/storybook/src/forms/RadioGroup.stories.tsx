import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@optiaxiom/react";
import { RadioGroup } from "@optiaxiom/react";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const items = [
  { label: "Sample 1", value: "sample-1" },
  { label: "Sample 2", value: "sample-2" },
  { label: "Sample 3", value: "sample-3" },
];

const itemsWithDescription = [
  {
    endDecorator: <Text>first</Text>,
    label: "Sample 1",
    value: "sample-1",
  },
  {
    disabled: true,
    endDecorator: <Text>second</Text>,
    label: "Sample 2",
    value: "sample-2",
  },
  {
    endDecorator: <Text>third</Text>,
    label: "Sample 3",
    value: "sample-3",
  },
];

export const Basic: Story = {
  args: {
    defaultValue: items[0].value,
    items: items,
  },
};

export const BasicHorizontal: Story = {
  args: {
    defaultValue: items[0].value,
    flexDirection: "row",
    items: items,
  },
};

export const WithDescription: Story = {
  args: {
    defaultValue: itemsWithDescription[0].value,
    items: itemsWithDescription,
  },
};

export const WithDescriptionHorizontal: Story = {
  args: {
    defaultValue: itemsWithDescription[0].value,
    flexDirection: "row",
    items: itemsWithDescription,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: items[0].value,
    disabled: true,
    items: items,
  },
};

export const SingleDisabled: Story = {
  args: {
    defaultValue: items[0].value,
    items: [
      ...items,
      {
        disabled: true,
        label: "Sample 4",
        value: "sample-4",
      },
    ],
  },
};

export const Readonly: Story = {
  args: {
    defaultValue: items[0].value,
    items: items,
    readonly: true,
  },
};
