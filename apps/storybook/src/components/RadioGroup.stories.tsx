import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Box,
  Button,
  Field,
  Grid,
  Group,
  Radio,
  RadioGroup,
  Text,
} from "@optiaxiom/react";
import { SurfaceProvider } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";

import styles from "./RadioGroup.module.css";

export default {
  args: {
    name: "story",
  },
  component: RadioGroup,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=4790:78962",
    },
  },
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
    <RadioGroup {...args} w="224">
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
  gap: "8",
  justifyContent: "flex-start",
  p: "16",
  rounded: "sm",
} as const;

export const ComplexExample1: Story = {
  render: (args) => (
    <RadioGroup asChild {...args} defaultValue="label-1" m="auto" w="3/4">
      <Grid gridTemplateColumns="2">
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
      </Grid>
    </RadioGroup>
  ),
};

const props2 = {
  alignItems: "start",
  borderT: "1",
  flexDirection: "row",
  p: "12",
} as const;

export const ComplexExample2: Story = {
  render: (args) => (
    <RadioGroup borderB="1" {...args} defaultValue="label-1">
      <Group {...props2} gap="8">
        <Radio value="label-1" w="3xl">
          Admin
        </Radio>
        <Box asChild pl="24" style={{ listStyle: "disc" }}>
          <ul>
            <li>
              <Text>Can add or remove members.</Text>
            </li>
            <li>
              <Text>Plus Editor permissions.</Text>
            </li>
          </ul>
        </Box>
      </Group>
      <Group {...props2} gap="8">
        <Radio value="label-2" w="3xl">
          Editor
        </Radio>
        <Box asChild pl="24" style={{ listStyle: "disc" }}>
          <ul>
            <li>
              <Text>Can adjust flag settings.</Text>
            </li>
            <li>
              <Text>Can edit non-published variables, variations, etc.</Text>
            </li>
          </ul>
        </Box>
      </Group>
    </RadioGroup>
  ),
};

export const WithSuggestion: Story = {
  render: function WithSuggestion(args) {
    const [value, setValue] = useState<string>();
    const defaultSuggestions = [
      {
        createdAt: new Date().toISOString(),
        id: "sug-1",
        page: "product<storybook>/page<demo>",
        reason: "Based on your recent deployments",
        surface: "property<environment>",
        type: "value" as const,
        value: "staging",
      },
    ];
    const [suggestions, setSuggestions] = useState(defaultSuggestions);

    return (
      <SurfaceProvider
        accept={(suggestionId: string) => {
          action("accept")(suggestionId);
          setValue(
            String(suggestions.find((s) => s.id === suggestionId)?.value),
          );
          setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
        }}
        executeTool={action("execute")}
        metadata={{}}
        name="environment"
        pageViewId=""
        path="product<storybook>/page<demo>/resource<form>/property<environment>"
        reject={(suggestionId: string) => {
          action("reject")(suggestionId);
          setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
        }}
        renderSuggestionValue={(v: unknown) => String(v)}
        suggestionPopover={{ register: () => () => {}, registered: false }}
        suggestions={suggestions}
        track={action("track")}
        type="property"
      >
        <Group alignItems="start" flexDirection="column" gap="16">
          <Field label="Environment">
            <RadioGroup {...args} onValueChange={setValue} value={value}>
              <Radio value="development">Development</Radio>
              <Radio value="staging">Staging</Radio>
              <Radio value="production">Production</Radio>
            </RadioGroup>
          </Field>

          <Group gap="8">
            <Text fontSize="sm">Selected: {value || "None"}</Text>
            <Text fontSize="sm">Suggestions: {suggestions.length}</Text>
          </Group>

          <Button
            disabled={suggestions.length > 0}
            onClick={() => setSuggestions(defaultSuggestions)}
            size="sm"
          >
            Reset Suggestion
          </Button>
        </Group>
      </SurfaceProvider>
    );
  },
};
