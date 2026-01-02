import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Group, Input, Text } from "@optiaxiom/react";
import { SurfaceProvider } from "@optiaxiom/react/unstable";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";
import { action } from "storybook/actions";

export default {
  args: {
    placeholder: "Enter text...",
  },
  component: Input,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=20%3A2741",
    },
  },
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {};

export const Value: Story = {
  args: {
    defaultValue: "Some user input value",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} size="md" />
      <Input {...args} size="lg" />
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} placeholder="Disabled placeholder..." />
      <Input {...args} defaultValue="Disabled with value" />
    </Group>
  ),
};

export const Readonly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} placeholder="Readonly placeholder..." />
      <Input {...args} defaultValue="Readonly with value" />
    </Group>
  ),
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} placeholder="Error placeholder..." />
      <Input {...args} defaultValue="Error with value" />
    </Group>
  ),
};

export const Addons: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input
        {...args}
        addonBefore={<IconCalendar size="20" />}
        placeholder="With left Icon"
      />
      <Input
        {...args}
        addonAfter={<IconCalendar size="20" />}
        placeholder="With right Icon"
      />
      <Input
        {...args}
        addonAfter={<IconCalendar size="20" />}
        addonBefore={<IconCalendar size="20" />}
        placeholder="With both Icon"
      />
    </Group>
  ),
};

export const NumberInput: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input
        {...args}
        appearance="number"
        defaultValue="20.00"
        placeholder="00.00"
      />
      <Input {...args} appearance="number" placeholder="00.00" />
      <Input {...args} appearance="number" disabled placeholder="00.00" />
      <Input {...args} appearance="number" defaultValue="20.00" error />
    </Group>
  ),
};

export const Types: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Input {...args} type="date" />
      <Input {...args} type="file" />
      <Input {...args} defaultValue="query" type="password" />
      <Input {...args} autoFocus defaultValue="query" type="search" />
      <Input {...args} defaultValue="query" type="text" />
      <Input {...args} type="time" />
    </Group>
  ),
};

export const WithSuggestion: Story = {
  render: function WithSuggestion() {
    const [value, setValue] = useState("");
    const defaultSuggestions = [
      {
        createdAt: new Date().toISOString(),
        id: "sug-1",
        page: "product<storybook>/page<demo>",
        reason: "Based on your previous entries",
        surface: "property<email>",
        type: "value" as const,
        value: "john.doe@example.com",
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
        name="email"
        pageViewId=""
        path="product<storybook>/page<demo>/resource<form>/property<email>"
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
          <Input
            onValueChange={setValue}
            placeholder="Enter email"
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
