import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup, RadioItem, Text } from "@optiaxiom/react";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1">
      <RadioItem value="sample-1">Sample 1</RadioItem>
      <RadioItem value="sample-2">Sample 2</RadioItem>
      <RadioItem value="sample-3">Sample 3</RadioItem>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1" flexDirection="row">
      <RadioItem value="sample-1">Sample 1</RadioItem>
      <RadioItem value="sample-2">Sample 2</RadioItem>
      <RadioItem value="sample-3">Sample 3</RadioItem>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1">
      <RadioItem endDecorator={<Text>first</Text>} value="sample-1">
        Sample 1
      </RadioItem>
      <RadioItem endDecorator={<Text>second</Text>} value="sample-2">
        Sample 2
      </RadioItem>
      <RadioItem endDecorator={<Text>third</Text>} value="sample-3">
        Sample 3
      </RadioItem>
    </RadioGroup>
  ),
};

export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1" disabled>
      <RadioItem value="sample-1">Sample 1</RadioItem>
      <RadioItem value="sample-2">Sample 2</RadioItem>
      <RadioItem value="sample-3">Sample 3</RadioItem>
    </RadioGroup>
  ),
};

export const MixedState: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1">
      <RadioItem value="sample-1">Sample 1</RadioItem>
      <RadioItem disabled value="sample-2">
        Sample 2
      </RadioItem>
      <RadioItem value="sample-3">Sample 3</RadioItem>
      <RadioItem disabled value="sample-4">
        Sample 4
      </RadioItem>
    </RadioGroup>
  ),
};

export const Readonly: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1" readonly>
      <RadioItem value="sample-1">Sample 1</RadioItem>
      <RadioItem value="sample-2">Sample 2</RadioItem>
      <RadioItem value="sample-3">Sample 3</RadioItem>
    </RadioGroup>
  ),
};
