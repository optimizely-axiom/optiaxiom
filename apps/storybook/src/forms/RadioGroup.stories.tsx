import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@optiaxiom/react";
import { RadioGroup } from "@optiaxiom/react";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const items = [
  { label: <Text> Sample 1</Text>, value: "sample-1" },
  { label: <Text> Sample 2</Text>, value: "sample-2" },
  { label: <Text> Sample 3</Text>, value: "sample-3" },
];

const itemsWithDescription = [
  {
    label: (
      <Text>
        Sample 1
        <Text as="p" fontSize="sm">
          first
        </Text>
      </Text>
    ),
    value: "sample-1",
  },
  {
    label: (
      <Text>
        Sample 2
        <Text as="p" fontSize="sm">
          second
        </Text>
      </Text>
    ),
    value: "sample-2",
  },
  {
    label: (
      <Text>
        Sample 3
        <Text as="p" fontSize="sm">
          third
        </Text>
      </Text>
    ),
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
        label: <Text> Sample 4</Text>,
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
