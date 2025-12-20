import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Group, Text, Textarea } from "@optiaxiom/react";
import { SurfaceProvider } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";

export default {
  args: {
    placeholder: "Enter text....",
  },
  component: Textarea,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=679:6927",
    },
  },
} as Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {};

export const Value: Story = {
  args: {
    defaultValue: "Some user input value",
  },
};

export const ManualResize: Story = {
  args: {
    defaultValue:
      "Lorem Ipsum is a placeholder text commonly used in the design and printing industries.\nDespite its widespread use, the origins of Lorem Ipsum are somewhat mysterious. Several theories exist about who may have invented the text, but no one knows.",
    resize: "vertical",
  },
  render: (args) => (
    <Group flexDirection="column" gap="16" maxW="xs">
      <Textarea {...args} />
      <Textarea {...args} resize="none" />
    </Group>
  ),
};

export const AutoSize: Story = {
  args: {
    defaultValue:
      "Lorem Ipsum is a placeholder text commonly used in the design and printing industries.\nDespite its widespread use, the origins of Lorem Ipsum are somewhat mysterious. Several theories exist about who may have invented the text, but no one knows.",
    resize: "auto",
  },
  render: (args) => (
    <Group flexDirection="column" gap="16" maxW="xs">
      <Textarea {...args} />
      <Textarea {...args} maxRows={2} />
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Textarea {...args} placeholder="Disabled placeholder..." />
      <Textarea {...args} defaultValue="Disabled with value" />
    </Group>
  ),
};

export const Readonly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Textarea {...args} placeholder="Readonly placeholder..." />
      <Textarea {...args} defaultValue="Readonly with value" />
    </Group>
  ),
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Textarea {...args} placeholder="Error placeholder..." />
      <Textarea {...args} defaultValue="Error with value" />
    </Group>
  ),
};

export const Addons: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Textarea {...args} addonBefore={<Text>Top Section</Text>} />
      <Textarea {...args} addonAfter={<Text>Bottom Section</Text>} />
    </Group>
  ),
};

export const WithSuggestion: Story = {
  render: function WithSuggestion() {
    const [value, setValue] = useState("");
    const defaultSuggestions = [
      {
        id: "sug-1",
        reason: "Based on similar entries",
        surface:
          "product<storybook>/page<demo>/resource<form>/property<description>",
        type: "value" as const,
        value:
          "This feature will improve user experience by providing real-time feedback and reducing the number of steps required to complete the workflow.",
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
        name="description"
        pageViewId=""
        path="product<storybook>/page<demo>/resource<form>/property<description>"
        reject={(suggestionId: string) => {
          action("reject")(suggestionId);
          setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
        }}
        suggestionPopover={{ register: () => () => {}, registered: false }}
        suggestions={suggestions}
        track={action("track")}
        type="property"
      >
        <Group alignItems="start" flexDirection="column" gap="16">
          <Textarea
            onValueChange={setValue}
            placeholder="Enter description"
            value={value}
          />

          <Group gap="8">
            <Text fontSize="sm">Value: {value || "(empty)"}</Text>
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
