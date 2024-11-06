import type { Meta, StoryObj } from "@storybook/react";

import { Box, Flex, Grid, Radio, RadioGroup, Text } from "@optiaxiom/react";

import styles from "./RadioGroup.module.css";

export default {
  args: {
    name: "story",
  },
  component: RadioGroup,
} as Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="label-1">
      <Radio value="label-1">Label 1</Radio>
      <Radio value="label-2">Label 2</Radio>
      <Radio value="label-3">Label 3</Radio>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  args: {
    flexDirection: "row",
  },
  render: (args) => (
    <RadioGroup {...args} defaultValue="label-1">
      <Radio value="label-1">Label 1</Radio>
      <Radio value="label-2">Label 2</Radio>
      <Radio value="label-3">Label 3</Radio>
    </RadioGroup>
  ),
};

export const HelperText: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="label-1">
      <Radio description="Helper First" value="label-1">
        Label 1
      </Radio>
      <Radio description="Helper Second" disabled value="label-2">
        Label 2
      </Radio>
      <Radio description="Helper Third" value="label-3">
        Label 3
      </Radio>
    </RadioGroup>
  ),
};

export const MultiLineLabel: Story = {
  render: (args) => (
    <RadioGroup {...args} w="208">
      <Radio value="label-1">Label</Radio>
      <Radio value="label-2">This is an example of a multi line label</Radio>
    </RadioGroup>
  ),
};

export const DisabledGroup: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="label-1" disabled>
      <Radio value="label-1">Label 1</Radio>
      <Radio value="label-2">Label 2</Radio>
      <Radio value="label-3">Label 3</Radio>
    </RadioGroup>
  ),
};

export const DisabledItems: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="label-1">
      <Radio value="label-1">Label 1</Radio>
      <Radio disabled value="label-2">
        Label 2
      </Radio>
      <Radio value="label-3">Label 3</Radio>
      <Radio disabled value="label-4">
        Label 4
      </Radio>
    </RadioGroup>
  ),
};

const props = {
  border: "1",
  gap: "xs",
  justifyContent: "start",
  p: "md",
  rounded: "sm",
} as const;

export const ComplexExample1: Story = {
  render: (args) => (
    <Grid asChild gridTemplateColumns="2">
      <RadioGroup {...args} defaultValue="label-1" m="auto" w="3/4">
        <Radio
          className={styles.item}
          {...props}
          description="Displays a message as a bar at top of page"
          value="label-1"
        >
          Banner (copy)
        </Radio>
        <Radio
          className={styles.item}
          {...props}
          description="Places an icon of your choice on any element of the web page"
          value="label-2"
        >
          Celebrate
        </Radio>
        <Radio
          className={styles.item}
          {...props}
          description="Displays a number of views or purchases for a defined duration"
          value="label-3"
        >
          Social Proof
        </Radio>
      </RadioGroup>
    </Grid>
  ),
};

const props2 = {
  alignItems: "start",
  borderT: "1",
  flexDirection: "row",
  p: "sm",
} as const;

export const ComplexExample2: Story = {
  render: (args) => (
    <RadioGroup borderB="1" {...args} defaultValue="label-1">
      <Flex {...props2} gap="xs">
        <Radio value="label-1" w="128">
          Admin
        </Radio>
        <Box asChild pl="lg" style={{ listStyle: "disc" }}>
          <ul>
            <li>
              <Text>Can add or remove members.</Text>
            </li>
            <li>
              <Text>Plus Editor permissions.</Text>
            </li>
          </ul>
        </Box>
      </Flex>
      <Flex {...props2} gap="xs">
        <Radio value="label-2" w="128">
          Editor
        </Radio>
        <Box asChild pl="lg" style={{ listStyle: "disc" }}>
          <ul>
            <li>
              <Text>Can adjust flag settings.</Text>
            </li>
            <li>
              <Text>Can edit non-published variables, variations, etc.</Text>
            </li>
          </ul>
        </Box>
      </Flex>
    </RadioGroup>
  ),
};
