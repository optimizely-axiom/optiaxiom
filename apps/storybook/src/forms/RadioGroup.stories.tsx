import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  Flex,
  Grid,
  RadioGroup,
  RadioGroupItem,
  Text,
} from "@optiaxiom/react";

import styles from "./RadioGroup.module.css";

export default {
  component: RadioGroup,
} as Meta<typeof RadioGroup>;

type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="label-1">
      <RadioGroupItem value="label-1">Label 1</RadioGroupItem>
      <RadioGroupItem value="label-2">Label 2</RadioGroupItem>
      <RadioGroupItem value="label-3">Label 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup {...args} defaultValue="label-1" flexDirection="row">
      <RadioGroupItem value="label-1">Label 1</RadioGroupItem>
      <RadioGroupItem value="label-2">Label 2</RadioGroupItem>
      <RadioGroupItem value="label-3">Label 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const HelperText: Story = {
  render: () => (
    <RadioGroup defaultValue="sample-1">
      <RadioGroupItem endDecorator="Helper First" value="sample-1">
        Sample 1
      </RadioGroupItem>
      <RadioGroupItem disabled endDecorator="Helper Second" value="sample-2">
        Sample 2
      </RadioGroupItem>
      <RadioGroupItem endDecorator="Helper Third" value="sample-3">
        Sample 3
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const MultiLineLabel: Story = {
  render: (args) => (
    <RadioGroup {...args} w="208">
      <RadioGroupItem value="label-1">Label</RadioGroupItem>
      <RadioGroupItem value="label-2">
        This is an example of a multi line label
      </RadioGroupItem>
    </RadioGroup>
  ),
};

export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="label-1" disabled>
      <RadioGroupItem value="label-1">Label 1</RadioGroupItem>
      <RadioGroupItem value="label-2">Label 2</RadioGroupItem>
      <RadioGroupItem value="label-3">Label 3</RadioGroupItem>
    </RadioGroup>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <RadioGroup defaultValue="label-1">
      <RadioGroupItem value="label-1">Label 1</RadioGroupItem>
      <RadioGroupItem disabled value="label-2">
        Label 2
      </RadioGroupItem>
      <RadioGroupItem value="label-3">Label 3</RadioGroupItem>
      <RadioGroupItem disabled value="label-4">
        Label 4
      </RadioGroupItem>
    </RadioGroup>
  ),
};

const props = {
  border: "1",
  justifyContent: "start",
  p: "md",
  rounded: "sm",
} as const;

export const ComplexExample1: Story = {
  render: (args) => (
    <RadioGroup asChild {...args} defaultValue="label-1" m="auto" w="3/4">
      <Grid gridTemplateColumns="2">
        <Flex className={styles.item} {...props} gap="xs">
          <RadioGroupItem
            endDecorator="Displays a message as a bar at top of page"
            value="sample-1"
          >
            Banner (copy)
          </RadioGroupItem>
        </Flex>
        <Flex className={styles.item} {...props} gap="xs">
          <RadioGroupItem
            endDecorator="Places an icon of your choice on any element of the web page"
            value="sample-2"
          >
            Celebrate
          </RadioGroupItem>
        </Flex>
        <Flex className={styles.item} {...props} gap="xs">
          <RadioGroupItem
            endDecorator="Displays a number of views or purchases for a defined duration"
            value="sample-3"
          >
            Social Proof
          </RadioGroupItem>
        </Flex>
      </Grid>
    </RadioGroup>
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
        <RadioGroupItem value="label-1" w="128">
          Admin
        </RadioGroupItem>
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
        <RadioGroupItem value="label-2" w="128">
          Editor
        </RadioGroupItem>
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
