import type { Meta, StoryObj } from "@storybook/react";

import { RadioGroup, RadioGroupItem, Text } from "@optiaxiom/react";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="sample-1">
      <RadioGroupItem value="sample-1">Sample 1</RadioGroupItem>
      <RadioGroupItem value="sample-2">Sample 2</RadioGroupItem>
      <RadioGroupItem value="sample-3">Sample 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="sample-1" flexDirection="row">
      <RadioGroupItem value="sample-1">Sample 1</RadioGroupItem>
      <RadioGroupItem value="sample-2">Sample 2</RadioGroupItem>
      <RadioGroupItem value="sample-3">Sample 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const HelperText: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1">
      <RadioGroupItem
        endDecorator={
          <Text color="fg.secondary" fontSize="sm">
            Helper First
          </Text>
        }
        value="sample-1"
      >
        Sample 1
      </RadioGroupItem>
      <RadioGroupItem
        disabled
        endDecorator={
          <Text color="fg.secondary" fontSize="sm">
            Helper Second
          </Text>
        }
        value="sample-2"
      >
        Sample 2
      </RadioGroupItem>
      <RadioGroupItem
        endDecorator={
          <Text color="fg.secondary" fontSize="sm">
            Helper Third
          </Text>
        }
        value="sample-3"
      >
        Sample 3
      </RadioGroupItem>
      <RadioGroupItem
        endDecorator={
          <Text color="fg.secondary" fontSize="sm">
            Helper Fourth
          </Text>
        }
        readonly
        value="sample-4"
      >
        Sample 4
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1" disabled>
      <RadioGroupItem value="sample-1">Sample 1</RadioGroupItem>
      <RadioGroupItem value="sample-2">Sample 2</RadioGroupItem>
      <RadioGroupItem value="sample-3">Sample 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1">
      <RadioGroupItem value="sample-1">Sample 1</RadioGroupItem>
      <RadioGroupItem disabled value="sample-2">
        Sample 2
      </RadioGroupItem>
      <RadioGroupItem value="sample-3">Sample 3</RadioGroupItem>
      <RadioGroupItem disabled value="sample-4">
        Sample 4
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const Readonly: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1">
      <RadioGroupItem value="sample-1">Sample 1</RadioGroupItem>
      <RadioGroupItem readonly value="sample-2">
        Sample 2
      </RadioGroupItem>
      <RadioGroupItem value="sample-3">Sample 3</RadioGroupItem>
    </RadioGroup>
  ),
};
