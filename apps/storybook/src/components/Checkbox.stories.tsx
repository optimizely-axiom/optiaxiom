import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button, Checkbox, Group, Text } from "@optiaxiom/react";
import { SurfaceProvider } from "@optiaxiom/react/unstable";
import { useState } from "react";
import { action } from "storybook/actions";
import { screen, userEvent } from "storybook/test";

export default {
  args: {
    children: "Label",
  },
  component: Checkbox,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=99:1127",
    },
  },
} as Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {};

export const HelperText: Story = {
  args: {
    description: "Helper Text",
  },
};

export const MultiLineLabel: Story = {
  render: (args) => (
    <Group flexDirection="column" gap="16" w="224">
      <Checkbox {...args} />
      <Checkbox {...args}>This is an example of a multi line label</Checkbox>
    </Group>
  ),
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Checkbox {...args} />
      <Checkbox {...args} disabled />
    </Group>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Checkbox {...args} defaultChecked />
      <Checkbox {...args} />
    </Group>
  ),
};

export const Intermediate: Story = {
  args: {
    checked: true,
    indeterminate: true,
  },
  render: (args) => (
    <Group flexDirection="column" gap="16">
      <Checkbox {...args} />
      <Checkbox {...args} disabled />
    </Group>
  ),
};

export const VerticalAlignment: Story = {
  render: (args) => (
    <Group gap="16">
      <Group border="1" flexDirection="column" gap="16">
        <Checkbox alignItems="center" h="xl" {...args} />
      </Group>
      <Group border="1" flexDirection="column" gap="16">
        <Checkbox alignItems="center" aria-label="Label" h="xl" {...args}>
          {null}
        </Checkbox>
      </Group>
    </Group>
  ),
};

export const WithSuggestion: Story = {
  play: async () => {
    await userEvent.click(
      await screen.findByRole("button", { name: "Opal suggestion" }),
    );
  },
  render: function WithSuggestion() {
    const [checked, setChecked] = useState(false);
    const defaultSuggestions = [
      {
        createdAt: new Date().toISOString(),
        id: "sug-1",
        page: "product<storybook>/page<demo>",
        reason: "Required to continue",
        surface: "property<terms>",
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
        name="terms"
        pageViewId=""
        path="product<storybook>/page<demo>/resource<form>/property<terms>"
        reject={(suggestionId: string) => {
          action("reject")(suggestionId);
          setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
        }}
        renderSuggestionValue={(value) => (value ? "on" : "off")}
        suggestionAlert={{ register: () => () => {}, registered: true }}
        suggestionPopover={{ register: () => () => {}, registered: false }}
        suggestions={suggestions}
        track={action("track")}
        type="property"
      >
        <Group alignItems="start" flexDirection="column" gap="16">
          <Checkbox checked={checked} onCheckedChange={setChecked}>
            I agree to the terms and conditions
          </Checkbox>

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
