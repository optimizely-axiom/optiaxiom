import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Group, Switch, Text, Tooltip } from "@optiaxiom/react";
import { SurfaceProvider } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";

export default {
  args: {
    children: "Label",
  },
  component: Switch,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=293:3346",
    },
  },
} as Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const Basic: Story = {};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const MultiLineLabel: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16" w="224">
      <Switch {...args} />
      <Switch {...args}>This is a medium example of a multi line label</Switch>
      <Switch {...args} size="lg">
        This is a large example of a multi line label
      </Switch>
    </Group>
  ),
};

export const WithTooltip: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16" w="224">
      <Switch {...args} />
      <Switch {...args}>
        <Tooltip auto content="This is a medium example of a multi line label">
          <Text truncate>This is a medium example of a multi line label</Text>
        </Tooltip>
      </Switch>
      <Switch {...args} size="lg">
        <Tooltip auto content="This is a large example of a multi line label">
          <Text truncate>This is a large example of a multi line label</Text>
        </Tooltip>
      </Switch>
    </Group>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Switch {...args} />
      <Switch {...args} disabled />
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Switch {...args} defaultChecked />
      <Switch {...args} />
    </Group>
  ),
};

export const WithSuggestion: Story = {
  render: function WithSuggestion() {
    const [checked, setChecked] = useState(false);
    const defaultSuggestions = [
      {
        createdAt: new Date().toISOString(),
        id: "sug-1",
        reason: "Recommended for better collaboration",
        surface:
          "product<storybook>/page<demo>/resource<settings>/property<notifications>",
        type: "value" as const,
        value: true,
      },
    ];
    const [suggestions, setSuggestions] = useState(defaultSuggestions);

    return (
      <SurfaceProvider
        accept={(suggestionId: string) => {
          action("accept")(suggestionId);
          setChecked(
            Boolean(suggestions.find((s) => s.id === suggestionId)?.value),
          );
          setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
        }}
        executeTool={action("execute")}
        metadata={{}}
        name="notifications"
        pageViewId=""
        path="product<storybook>/page<demo>/resource<settings>/property<notifications>"
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
          <Switch checked={checked} onCheckedChange={setChecked}>
            Enable notifications
          </Switch>

          <Group gap="8">
            <Text fontSize="sm">Checked: {checked ? "Yes" : "No"}</Text>
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
